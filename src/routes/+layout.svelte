<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Head from '$lib/components/layout/Head.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';

	let { children } = $props();
</script>

<Head />
<ModeWatcher />
<Toaster />
<div class="flex min-h-screen flex-col">
	<Header />

	<main class="mx-auto box-border flex w-full max-w-4xl flex-1 flex-col p-4">
		{@render children()}
	</main>

	<Footer />
</div>
