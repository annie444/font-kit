<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';

	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { toast } from 'svelte-sonner';
	import type { Font } from '$lib/components/forms';
	import { uploadStatus } from '$lib/stores/upload-status';

	interface Props {
		font: Font;
		toastId?: string | number;
	}

	let { font, toastId }: Props = $props();

	let fontLoaded = $state(false);
	let demoArea = $state<HTMLPreElement | null>(null);

	let testText = $state(`a b c d e f g h i j k l m n o p q r s t u v w x y z
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω
Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω
à á â ã ä å æ ç è é ê ë ì í î ï ñ ò ó ô õ ö ø ù ú û ü ý þ ÿ
À Á Â Ã Ä Å Æ Ç È É Ê Ë Ì Í Î Ï Ñ Ò Ó Ô Õ Ö Ø Ù Ú Û Ü Ý Þ Ÿ
0 1 2 3 4 5 6 7 8 9 1/2 1/4 3/4
!@#$%^&*()-_=+[]{}|;:'",.<>?/
<- -> ~> <~ == != >= <= === =>
<=> <-> <~> <==> <--> <~~>
1a 2b 3c 4d 5e 6f 7g 8h 9i 0j
f(x) = x^2 + 2x - 3
y = mx + b
The quick brown fox jumps over the lazy dog.
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore
magna aliqua.
`);

	let features = $derived<Record<string, number>>(
		(font?.features ?? []).reduce(
			(acc, feature) => {
				Object.assign(acc, { [`${feature}`]: 0 });
				return acc;
			},
			{} as Record<string, number>
		)
	);

	let rows = $derived(Math.ceil(features ? Object.keys(features).length / 3 : 0) + 2);

	// Load font using Font Loading API
	$effect(() => {
		if (!font) {
			fontLoaded = false;
			return;
		}

		fontLoaded = false;

		// Remove existing style
		const existingStyle = document.getElementById('custom-font-style');
		if (existingStyle) {
			existingStyle.remove();
		}

		// Create @font-face rule using CSSStyleSheet API for safety
		const style = document.createElement('style');
		style.id = 'custom-font-style';
		document.head.appendChild(style);

		// Use CSS.escape for the font family name to prevent injection
		const safeFontName = CSS.escape(font.font);
		const fontFaceRule = `@font-face { font-family: '${safeFontName}'; src: url('${encodeURI(font.url)}') format('${font.format}'); }`;

		if (style.sheet) {
			style.sheet.insertRule(fontFaceRule, 0);
		}

		// Use Font Loading API to detect when font is ready
		const fontFaceToLoad = `1em "${font.font}"`;

		// Add timeout for font loading
		const loadPromise = document.fonts.load(fontFaceToLoad);
		const timeoutPromise = new Promise<FontFace[]>((_, reject) =>
			setTimeout(() => reject(new Error('Font load timeout')), 15000)
		);

		Promise.race([loadPromise, timeoutPromise])
			.then(() => {
				fontLoaded = true;
				uploadStatus.complete();

				if (toastId) {
					toast.success('Font ready!', {
						id: toastId,
						description: `${font.font} loaded successfully`
					});
				}
			})
			.catch((error) => {
				console.error('Font loading failed:', error);
				uploadStatus.error('Font failed to load from CDN');

				if (toastId) {
					toast.error('Font loading failed', {
						id: toastId,
						description: 'Could not load font from CDN'
					});
				}

				// Still show UI even if font fails to load
				fontLoaded = true;
			});

		return () => {
			const styleToRemove = document.getElementById('custom-font-style');
			if (styleToRemove) {
				styleToRemove.remove();
			}
		};
	});

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

		if (newState && !isActive) {
			features[feature] = 1;
		} else if (!newState && isActive) {
			features[feature] = 0;
		}

		const update = Object.entries(features)
			.map(([key, value]) => `"${key}" ${value === 1 ? 'on' : 'off'}`)
			.join(', ');
		demoArea.style.fontFeatureSettings = update;
	}
</script>

{#if font}
	{#if !fontLoaded}
		<!-- Loading skeleton to prevent layout shift -->
		<div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
			<Card.Root class="md:col-span-2">
				<Card.Header>
					<Skeleton class="h-6 w-32" />
				</Card.Header>
				<Card.Content>
					<Skeleton class="h-48 w-full" />
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Skeleton class="h-6 w-28" />
				</Card.Header>
				<Card.Content>
					<div class="grid grid-cols-3 gap-2">
						{#each [0, 1, 2, 3, 4, 5] as i (i)}
							<Skeleton class="h-6 w-full" />
						{/each}
					</div>
				</Card.Content>
			</Card.Root>
		</div>
		<Card.Root>
			<Card.Header>
				<Skeleton class="h-6 w-20" />
				<Skeleton class="h-4 w-40" />
			</Card.Header>
			<Card.Content>
				<Skeleton class="h-64 w-full" />
			</Card.Content>
		</Card.Root>
	{:else}
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
					<div class="text-sm text-muted-foreground">
						Toggle the OpenType features you want to test with this font. <br />
						<span class="text-xs italic"><i>Hover over feature names for more info.</i></span>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="grid grid-cols-3 gap-2">
						{#each font.features as feature (feature.name)}
							<div class="flex flex-row items-center">
								<Switch id={feature.name} onclick={toggleFeature} />
								<HoverCard.Root>
									<HoverCard.Trigger
										><Label for={feature.name} class="m-0.5 cursor-pointer select-none"
											>{feature.name}</Label
										></HoverCard.Trigger
									>
									<HoverCard.Content class="w-64" side="top" align="center" sideOffset={5}>
										{#if feature.info !== null && feature.info !== undefined}
											<div class="flex flex-col space-y-2 p-2">
												<strong>{feature.info.name}</strong>
												<p class="text-sm text-muted-foreground">
													{feature.info.description}
												</p>
											</div>
										{:else}
											<div class="p-2">
												<em>No additional information available.</em>
											</div>
										{/if}
									</HoverCard.Content>
								</HoverCard.Root>
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
{/if}
