<script lang="ts">
	import type { Snippet } from 'svelte'

	let { children }: { children: Snippet } = $props()
</script>

<div>
	{@render children()}
</div>

<style>
	div {
		--_row-gap: var(--row-gap, var(--spacing-16));

		display: grid;
		grid-template-columns: 1fr;
		margin: 0 auto;
		max-width: 800px;
		padding-inline: var(--spacing-main-inline);
		row-gap: var(--_row-gap);
	}
</style>
