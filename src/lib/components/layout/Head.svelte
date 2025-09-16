<script lang="ts">
	import { SITE_URL } from '$lib/consts';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { SvelteURL } from 'svelte/reactivity';
	import { asset } from '$app/paths';

	let canonicalUrl = $state(SITE_URL);

	onMount(() => {
		if (browser) {
			const url = new SvelteURL(window.location.href);
			canonicalUrl = url.origin;
		}
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={asset('/fft-192.png')} />
	<title>Font Feature Tester</title>
	<meta
		name="description"
		content="A basic site for demoing the OpenType features of custom fonts."
	/>
	<meta name="robots" content="all" />
	<meta
		name="keywords"
		content="fonts, ui, ux, typography, opentype, features, variable, webfonts"
	/>
	<meta property="og:locale" content="en_US" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Font Feature Tester" />
	<meta
		property="og:description"
		content="A basic site for demoing the OpenType features of custom fonts."
	/>
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="Font Feature Tester" />
	<meta property="og:image" content={asset('/fft.png')} />
	<meta property="og:image:secure_url" content={asset('/fft.png')} />
	<meta property="og:image:width" content="1080" />
	<meta property="og:image:heigth" content="1080" />
	<meta property="og:image:type" content="image/png" />
	<meta
		property="og:image:alt"
		content="In assorted decorative fonts it says 'Font Feature Tester'"
	/>
</svelte:head>
