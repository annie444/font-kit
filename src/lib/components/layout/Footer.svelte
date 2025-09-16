<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteDate } from 'svelte/reactivity';
	import { CopyrightIcon } from '@lucide/svelte';

	let year = $state(2025);

	onMount(() => {
		year = new SvelteDate().getFullYear();
	});
</script>

<footer class="border-t">
	<div
		class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-base sm:px-6"
	>
		<div class="flex">
			<CopyrightIcon size={16} class="content-center self-center" />&ensp;<span>{year}</span
			>&ensp;FontKit Tester
		</div>
		<div class="flex items-center">
			<span>v1</span>
		</div>
	</div>
</footer>
