<script lang="ts">
	import FontForm from '$lib/components/forms/font.svelte';
	import type { PageData } from './$types.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let { data }: { data: PageData } = $props();
	let font = $state<{ url: string; font: string; features: string[]; format: string } | null>(null);

	let testText = $state(`abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
0123456789
!@#$%^&*()-_=+[]{}|;:'",.<>?/
<- -> ~> <~ == != >= <= === => 
<=> <-> <~> <==> <--> <~~>
1a 2b 3c 4d 5e 6f 7g 8h 9i 0j
The quick brown fox jumps over the lazy dog.`);

	let demoArea = $state<HTMLPreElement | null>(null);

	$effect(() => {
		if (font) {
			const existingStyle = document.getElementById('custom-font-style');
			if (existingStyle) {
				existingStyle.remove();
			}
			const style = document.createElement('style');
			style.id = 'custom-font-style';
			style.innerHTML = `
			@font-face {
				font-family: '${font.font}';
				src: url('${font.url}') format('${font.format}');
			}`;
			document.head.appendChild(style);
		} else {
			const existingStyle = document.getElementById('custom-font-style');
			if (existingStyle) {
				existingStyle.remove();
			}
		}
	});

	let features = $derived<Record<string, number>>(
		(font?.features ?? []).reduce((acc, feature) => {
			Object.assign(acc, { [`${feature}`]: 0 });
			return acc;
		}, {})
	);

	$effect(() => {
		if (font && demoArea && features && Object.keys(features).length > 0) {
			demoArea.style.fontFeatureSettings = Object.entries(features)
				.map(([key, value]) => `"${key}" ${value === 1 ? 'on' : 'off'}`)
				.join(', ');
		}
	});

	function toggleFeature(e: Event & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (!font || !demoArea) return;
		const feature = e.currentTarget.id;
		const newState = e.currentTarget.dataset.state !== 'checked';
		const isActive = features[feature] === 1;
		console.log({ feature, newState, isActive });
		if (newState && !isActive) {
			features[feature] = 1;
		} else if (!newState && isActive) {
			features[feature] = 0;
		}
		const update = Object.entries(features)
			.map(([key, value]) => `"${key}" ${value === 1 ? 'on' : 'off'}`)
			.join(', ');
		console.log(update);
		demoArea.style.fontFeatureSettings = update;
	}
</script>

<div>
	<FontForm {data} bind:font />
	{#if font}
		<div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
			<Card.Root class="md:col-span-2">
				<Card.Header>
					<Card.Title>Sample Text</Card.Title>
				</Card.Header>
				<Card.Content>
					<Textarea bind:value={testText} class="w-full" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Font Features</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="grid grid-cols-2 gap-2 lg:grid-cols-3">
						{#each font.features as feature (feature)}
							<div class="flex flex-row items-center">
								<Switch id={feature} onclick={toggleFeature} />
								<Label for={feature} class="cursor-pointer select-none">{feature}</Label>
							</div>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>
		</div>
		<Card.Root>
			<Card.Header>
				<Card.Title>Preview</Card.Title>
				<Card.Description>Font: <strong>{font.font}</strong></Card.Description>
			</Card.Header>
			<Card.Content>
				<pre bind:this={demoArea} style="font-family: '{font.font}' !important;">{testText}</pre>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
