<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { superForm, fileProxy } from 'sveltekit-superforms';
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import type { FontFormProps, FontFormSubmit } from '$lib/components/forms';

	let { data, font = $bindable(), ...restProps }: FontFormProps = $props();

	let progress = $state(0);

	function fileUploadWithProgress(input: FontFormSubmit) {
		return new Promise<XMLHttpRequest>((resolve) => {
			const xhr = new XMLHttpRequest();

			xhr.upload.onprogress = function (event) {
				progress = Math.round((100 * event.loaded) / event.total);
			};

			xhr.onload = function () {
				if (xhr.readyState === xhr.DONE) {
					progress = 0;
					resolve(xhr);
				}
			};

			xhr.open('POST', input.action, true);
			xhr.send(input.formData);
		});
	}

	const form = superForm(data.form, {
		onSubmit: ({ customRequest }) => {
			customRequest(fileUploadWithProgress);
		},
		onResult({ result }) {
			if (result.type === 'success' && result.data) {
				font = {
					url: result.data.form.message.url,
					font: result.data.form.message.name,
					features: result.data.form.message.features,
					format: result.data.form.message.format,
					fileName: result.data.form.message.fileName
				};
			}
		}
	});

	const { form: formData, enhance } = form;

	const file = fileProxy(formData, 'font');
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
		{#if progress > 0}
			<Form.Button class="mt-0 lg:mt-10" disabled>Upload</Form.Button>
		{:else}
			<Form.Button class="mt-0 lg:mt-10">Upload</Form.Button>
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
	{#if progress > 0}
		<div
			class="my-4 flex w-full flex-row items-center gap-4 lg:mt-0"
			transition:fly={{
				delay: 0,
				duration: 300,
				easing: quadInOut,
				y: 20,
				opacity: 0
			}}
		>
			<Progress value={progress} />
		</div>
	{/if}
</div>
