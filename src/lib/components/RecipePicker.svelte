<script lang="ts">
	import type { DrinkRecipeWithoutIngredientsAndServings, DrinkWithSlug } from '$lib/types'

	import Icon from '@iconify/svelte'

	import Button, { ButtonVariant } from './buttons/Button.svelte'

	type RecipePickerProps = {
		drink: DrinkWithSlug
		recipes: DrinkRecipeWithoutIngredientsAndServings[]
		selectedRecipeId: number | null
	}

	let { drink, recipes, selectedRecipeId }: RecipePickerProps = $props()
</script>

<section>
	{#each recipes as recipe}
		{@const selected = recipe.id === selectedRecipeId}

		<a href="/drink/{drink.slug}/{recipe.id}" class:selected class="typescale-label-large">
			{#if selected}
				<Icon icon="material-symbols:check" />
			{/if}
			{recipe.name}
		</a>
	{/each}

	<Button
		variant={ButtonVariant.Outlined}
		href="/drink/{drink.slug}/add-recipe"
		iconStart="mdi:add"
	>
		Nytt recept
	</Button>
</section>

<style>
	section {
		align-items: center;
		display: flex;
		gap: var(--spacing-16);
	}

	a {
		align-items: center;
		background-color: var(--color-surface-container-low);
		border: var(--border-1) solid var(--color-outline-variant);
		border-radius: var(--corner-small);
		color: var(--color-on-surface-variant);
		display: flex;
		gap: 0.25em;
		padding: 0.5rem;
		text-decoration: none;

		&.selected {
			background-color: var(--color-secondary-container);
			border-color: var(--color-secondary-container);
			color: var(--color-on-secondary-container);
		}
	}
</style>
