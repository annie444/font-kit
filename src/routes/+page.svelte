<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { FontForm, type Font } from '$lib/components/forms';
	import type { PageData } from './$types.js';
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	let { data }: { data: PageData } = $props();
	let font = $state<Font>(null);

	let testText = $state(`abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
0123456789 1/2 1/4 3/4
!@#$%^&*()-_=+[]{}|;:'",.<>?/
<- -> ~> <~ == != >= <= === => 
<=> <-> <~> <==> <--> <~~>
1a 2b 3c 4d 5e 6f 7g 8h 9i 0j
The quick brown fox jumps over the lazy dog.
f(x) = x^2 + 2x - 3
y = mx + b`);

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

	let rows = $derived(Math.ceil(features ? Object.keys(features).length / 3 : 0) + 2);

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
	{#if font && features}
		<div
			class="my-4 grid grid-cols-1 gap-4 md:grid-cols-3"
			transition:fly={{
				delay: 0,
				duration: 300,
				easing: quadInOut,
				y: 20,
				opacity: 0
			}}
		>
			<Card.Root class="md:col-span-2">
				<Card.Header>
					<Card.Title>Sample Text</Card.Title>
				</Card.Header>
				<Card.Content>
					<Textarea bind:value={testText} class="h-full w-full" {rows} />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Font Features</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="grid grid-cols-3 gap-2">
						{#each font.features as feature (feature)}
							<div class="flex flex-row items-center">
								<Switch id={feature} onclick={toggleFeature} />
								<Label for={feature} class="m-0.5 cursor-pointer select-none">{feature}</Label>
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
				<pre
					bind:this={demoArea}
					style="font-family: '{font.font}' !important;"
					class="whitespace-pre-wrap">{testText}</pre>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
