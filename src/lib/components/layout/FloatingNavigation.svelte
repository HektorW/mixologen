<script lang="ts">
	import type { Snippet } from 'svelte'

	type FloatingNavigationProps = {
		children: Snippet
	}

	let { children }: FloatingNavigationProps = $props()
</script>

<nav>
	{@render children()}
</nav>

<style>
	nav {
		background-color: var(--color-surface-container-highest);
		border-radius: var(--corner-full);
		inset: auto 1rem 1rem;
		/* bottom: 1rem; */
		/* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
		display: flex;
		gap: 0.5rem;
		/* left: 1rem; */
		padding: 0.5rem;
		position: fixed;
		/* right: 1rem; */

		:global(:first-child) {
			margin-right: auto;
		}

		&:global(:not(:has(:nth-child(2)))) {
			& :global(> *) {
				flex: 1;
			}

			justify-content: stretch;
		}
	}
</style>
