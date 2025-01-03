<script lang="ts">
	import type { DrinkRecipeWithoutServings } from '$lib/types'

	import Icon from '@iconify/svelte'

	type RecipeProps = {
		recipe: DrinkRecipeWithoutServings
	}

	let { recipe }: RecipeProps = $props()
</script>

<article class="typescale-body-large">
	<h2 class="typescale-headline-medium">{recipe.name}</h2>

	<h3 class="typescale-headline-small">Ingredienser</h3>
	<ul class="ingredients">
		{#each recipe.ingredientsAndAmounts as ingredientAndAmount}
			<li class="ingredients__item">
				{#if ingredientAndAmount.ingredient.icon}
					<Icon class="ingredients__icon" icon={ingredientAndAmount.ingredient.icon} />
				{/if}
				<span class="ingredients__amount">{ingredientAndAmount.amount}</span>
				<span class="ingredients__name">{ingredientAndAmount.ingredient.name}</span>
			</li>
		{/each}
	</ul>

	{#if recipe.instructions && recipe.instructions.length > 0}
		<h3 class="typescale-headline-small instructions__heading">Instruktioner</h3>

		<ol>
			{#each recipe.instructions as instruction}
				<li>{instruction}</li>
			{/each}
		</ol>
	{/if}

	{#if recipe.notes}
		<h3 class="typescale-headline-small notes__heading">Anteckningar</h3>
		<p>{recipe.notes}</p>
	{/if}
</article>

<style>
	h2 {
		margin-block: 0;

		&:not(:last-child) {
			margin-block-end: 0.5em;
		}
	}

	h3 {
		border-top: 1px solid var(--color-on-surface);
		margin-block: var(--spacing-20);
		padding-top: var(--spacing-20);
	}

	ul,
	ol {
		display: grid;
		row-gap: 0.5em;
		margin-block: 0;
		padding-inline-start: 0;
	}

	.ingredients {
		column-gap: 1rem;
		grid-template-columns: auto auto 1fr;
	}

	.ingredients__item {
		align-items: center;
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 1 / -1;
		list-style-type: disc;
	}

	.ingredients__amount {
		grid-column: 2 / span 1;
	}

	ol {
		padding-inline-start: 1.25rem;

		li {
			padding-inline-start: 0.5rem;
		}
	}

	@container (width < 300px) {
		article {
			font-size: 0.8rem;
		}
	}

	@container (width < 200px) {
		article {
			font-size: 0.7rem;
		}
	}
</style>
