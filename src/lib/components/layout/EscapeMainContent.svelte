<script lang="ts">
	import type { Snippet } from 'svelte'

	let { children }: { children: Snippet } = $props()
</script>

<div>
	{@render children()}
</div>

<style>
	div {
		margin-inline: calc(var(--spacing-main-inline) * -1);
	}
</style>
