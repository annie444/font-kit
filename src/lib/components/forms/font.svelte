<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { FormSchema } from '$lib/forms/font';
	import { type SuperValidated, type Infer, superForm, fileProxy } from 'sveltekit-superforms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Progress } from '$lib/components/ui/progress/index.js';

	let {
		data,
		font = $bindable()
	}: {
		data: { form: SuperValidated<Infer<FormSchema>> };
		font: { url: string; font: string; features: string[]; format: string } | null;
	} = $props();

	let progress = $state(0);

	function fileUploadWithProgress(input: Parameters<SubmitFunction>[0]) {
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
					format: result.data.form.message.format
				};
			}
		}
	});

	const { form: formData, enhance } = form;

	const file = fileProxy(formData, 'font');
</script>

<div>
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
			<Form.Description>The font file to test</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button class="mt-0 lg:mt-10">Upload</Form.Button>
	</form>
	{#if progress > 0}
		<Progress value={progress} class="w-full" />
	{/if}
</div>
