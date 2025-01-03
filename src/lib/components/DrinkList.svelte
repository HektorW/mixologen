<script lang="ts">
	import type { DrinkWithRecipeIds } from '$lib/types'

	import Icon from '@iconify/svelte'

	import { viewTransitionDrinkName } from '$lib/viewTransitions'

	type DrinkListProps = {
		drinks: DrinkWithRecipeIds[]
	}

	let { drinks }: DrinkListProps = $props()
</script>

<ul>
	{#each drinks as drink}
		{@const firstRecipeId = drink.recipeIds[0]}
		{@const href = firstRecipeId ? `/drink/${drink.slug}/${firstRecipeId}` : `/drink/${drink.slug}`}

		<li>
			<a {href}>
				<span class="drink-name" {...viewTransitionDrinkName(drink)}>{drink.name}</span>
				<Icon icon="solar:alt-arrow-right-linear" />
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		margin: 0;
		padding-inline-start: 0;
	}

	li {
		list-style: none;

		&:not(:last-child) {
			border-bottom: 1px solid;
		}
	}

	a {
		align-items: center;
		color: inherit;
		display: flex;
		font-family: var(--font-family-heading);
		font-size: 3rem;
		padding-block: 0.5em;
		text-decoration: none;

		.drink-name {
			margin-inline-end: auto;
		}
	}
</style>
