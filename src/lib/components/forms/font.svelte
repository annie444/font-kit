<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { superForm, fileProxy } from 'sveltekit-superforms';
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { toast } from 'svelte-sonner';
	import type { FontFormProps, FontFormSubmit } from '$lib/components/forms';
	import { uploadStatus } from '$lib/stores/upload-status';
	import { estimateR2UploadDuration, createProgressAnimator } from '$lib/utils/upload-progress';

	let {
		data,
		font = $bindable(),
		toastId = $bindable<string | number | undefined>(undefined),
		...restProps
	}: FontFormProps = $props();

	let isUploading = $state(false);
	let progressAnimator: ReturnType<typeof createProgressAnimator> | null = null;

	function fileUploadWithProgress(input: FontFormSubmit) {
		const fileData = input.formData.get('font') as File | null;
		const fileSize = fileData?.size ?? 0;

		// Cancel any existing animation
		if (progressAnimator) {
			progressAnimator.cancel();
			progressAnimator = null;
		}

		// Stage 1: Uploading to server
		isUploading = true;
		uploadStatus.startUpload(fileSize);
		toastId = toast.loading('Uploading font...', {
			description: '0%'
		});

		return new Promise<XMLHttpRequest>((resolve) => {
			const xhr = new XMLHttpRequest();

			xhr.upload.onprogress = function (event) {
				const progress = Math.round((100 * event.loaded) / event.total);
				uploadStatus.updateUploadProgress(progress);
				toast.loading('Uploading font...', {
					id: toastId,
					description: `${progress}%`
				});
			};

			xhr.onload = function () {
				if (xhr.readyState === xhr.DONE) {
					// Stage 2: Processing (brief, server parsing)
					uploadStatus.startProcessing();
					toast.loading('Processing font...', {
						id: toastId,
						description: 'Analyzing font features'
					});

					// Stage 3: Estimated R2 upload progress
					const estimatedDuration = estimateR2UploadDuration(fileSize);
					uploadStatus.startSaving(fileSize);

					progressAnimator = createProgressAnimator(estimatedDuration, 95, (progress) => {
						uploadStatus.updateSavingProgress(progress);
						toast.loading('Saving to cloud...', {
							id: toastId,
							description: `${progress}%`
						});
					});
					progressAnimator.start();

					resolve(xhr);
				}
			};

			xhr.onerror = function () {
				isUploading = false;
				uploadStatus.error('Network error');
				toast.error('Upload failed', {
					id: toastId,
					description: 'Please check your connection and try again'
				});
			};

			xhr.open('POST', input.action, true);
			xhr.send(input.formData);
		});
	}

	let form = $derived(
		superForm(data.form, {
			invalidateAll: false, // Prevent page reload after submission
			onSubmit: ({ customRequest }) => {
				customRequest(fileUploadWithProgress);
			},
			onResult({ result }) {
				// Complete the progress animation
				if (progressAnimator) {
					progressAnimator.complete();
					progressAnimator = null;
				}

				isUploading = false;

				if (result.type === 'success' && result.data) {
					// Stage 4: Loading font preview (handled by FontPreview component)
					uploadStatus.startLoadingFont();
					toast.loading('Loading font preview...', {
						id: toastId,
						description: 'Downloading from CDN'
					});

					font = {
						url: result.data.form.message.url,
						font: result.data.form.message.name,
						features: result.data.form.message.features,
						format: result.data.form.message.format,
						fileName: result.data.form.message.fileName
					};
				} else if (result.type === 'failure') {
					const errorMessage = result.data?.form?.message ?? 'Upload failed';
					uploadStatus.error(errorMessage);
					toast.error('Upload failed', {
						id: toastId,
						description: errorMessage
					});
				}
			},
			onError({ result }) {
				if (progressAnimator) {
					progressAnimator.cancel();
					progressAnimator = null;
				}
				isUploading = false;
				const errorMessage =
					result.error instanceof Error ? result.error.message : 'An error occurred';
				uploadStatus.error(errorMessage);
				toast.error('Upload failed', {
					id: toastId,
					description: errorMessage
				});
			}
		})
	);

	const { form: formData, enhance } = $derived(form);

	const file = $derived(fileProxy(formData, 'font'));

	// Cleanup on unmount
	$effect(() => {
		return () => {
			if (progressAnimator) {
				progressAnimator.cancel();
			}
		};
	});
</script>

<div {...restProps}>
	<form
		method="POST"
		enctype="multipart/form-data"
		use:enhance
		class="flex flex-col gap-4 lg:flex-row"
	>
		<Form.Field {form} name="font">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-2xl">Font File Upload</Form.Label>
					<Input
						type="file"
						accept="font/ttf, font/otf, font/woff, font/woff2, application/font-sfnt, application/vnd.ms-fontobject, application/font-woff, application/font-woff2"
						{...props}
						bind:files={$file}
					/>
				{/snippet}
			</Form.Control>
			<Form.Description>Click above to choose the file</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button class="mt-0 lg:mt-10" disabled={isUploading}>
			{isUploading ? 'Uploading...' : 'Upload'}
		</Form.Button>
		{#if font}
			<Button type="button" class="mt-0 lg:mt-10" onclick={() => (font = null)}>Clear</Button>
		{/if}
		{#if font}
			<div
				class="my-4"
				transition:fly={{
					delay: 0,
					duration: 300,
					easing: quadInOut,
					x: 20,
					opacity: 0
				}}
			>
				<strong>Font name:</strong>
				{font.font} <br />
				<strong>Font file:</strong>
				{font.fileName} <br />
				<strong>Font format:</strong>
				{font.format} <br />
			</div>
		{/if}
	</form>
</div>
