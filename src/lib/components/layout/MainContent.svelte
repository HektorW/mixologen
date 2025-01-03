<script lang="ts">
	import type { Snippet } from 'svelte'

	let { children }: { children: Snippet } = $props()
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		margin: 0 auto;
		max-width: 800px;
		padding-block: var(--spacing-main-block) var(--spacing-main-bottom-nav);
		padding-inline: var(--spacing-main-inline);
	}
</style>
