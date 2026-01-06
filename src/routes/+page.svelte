<script lang="ts">
	import { FontForm, type Font } from '$lib/components/forms';
	import FontPreview from '$lib/components/font-preview.svelte';
	import { fontStore } from '$lib/stores/font-store';
	import type { PageData } from './$types.js';

	let { data }: { data: PageData } = $props();
	let font = $state<Font>(null);
	let toastId = $state<string | number | undefined>(undefined);
	let isRestored = $state(false);

	// Initialize from store on mount
	$effect(() => {
		const unsubscribe = fontStore.subscribe((storedFont) => {
			if (!isRestored && storedFont) {
				font = storedFont;
				isRestored = true;
			}
		});
		return unsubscribe;
	});

	// Persist font changes to store
	$effect(() => {
		if (isRestored) {
			// Sync any changes (including clearing) to the store
			fontStore.set(font);
		} else if (font) {
			// New upload - save it
			fontStore.set(font);
			isRestored = true;
		}
	});
</script>

<div>
	<!-- Hero Section -->
	<section class="mb-8">
		<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
			Test Your Font's OpenType Features
		</h2>
		<p class="mt-3 max-w-2xl text-lg text-muted-foreground">
			Upload any font file to explore its OpenType features like ligatures, stylistic alternates,
			and more. Toggle features on and off to see how they affect your text in real-time.
		</p>
		<div class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
			<div class="flex items-center gap-2">
				<span
					class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-base font-medium text-primary"
					>1</span
				>
				<span>Upload a font file</span>
			</div>
			<div class="flex items-center gap-2">
				<span
					class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-base font-medium text-primary"
					>2</span
				>
				<span>Toggle OpenType features</span>
			</div>
			<div class="flex items-center gap-2">
				<span
					class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-base font-medium text-primary"
					>3</span
				>
				<span>Preview the results</span>
			</div>
		</div>
		<p class="mt-3 max-w-2xl text-sm text-muted-foreground">
			Supported formats: TTF, OTF, WOFF, WOFF2.
		</p>
		<p class="mt-1 max-w-2xl text-xs text-muted-foreground">
			The fonts are uploaded to Cloudflare R2 for processing and are deleted after 24 hours. No data
			is stored permanently; no information about the font or you - the user.
		</p>
	</section>

	<FontForm {data} bind:font bind:toastId />
	<FontPreview {font} {toastId} />
</div>
