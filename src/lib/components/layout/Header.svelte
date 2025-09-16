<script lang="ts">
	import { SITE_URL } from '$lib/consts';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { SvelteURL } from 'svelte/reactivity';

	let canonicalUrl = $state(SITE_URL);

	onMount(() => {
		if (browser) {
			const url = new SvelteURL(window.location.href);
			canonicalUrl = url.origin;
		}
	});
</script>

<header class="border-b">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
		<a href={`${canonicalUrl}/`}>
			<div class="flex items-center gap-2">
				<h1 class="text-2xl font-bold">Font Feature Tester</h1>
			</div>
		</a>
	</div>
</header>
