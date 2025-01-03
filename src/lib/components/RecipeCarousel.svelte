<script lang="ts">
	import type { DrinkRecipe } from '$lib/types'

	import Recipe from './Recipe.svelte'

	type RecipeCarouselProps = {
		recipes: DrinkRecipe[]
		selectedRecipeId: number | null
		handleRecipeSelect: (id: number) => void
	}

	let { recipes, selectedRecipeId, handleRecipeSelect }: RecipeCarouselProps = $props()
</script>

<section class="carousel">
	<div class="carousel-scroller">
		{#each recipes as recipe}
			<article class:active={selectedRecipeId === recipe.id}>
				<Recipe {recipe} />
			</article>
		{/each}
	</div>
</section>

<style>
	.carousel {
		--_carousel-gutters: 2rem;

		display: grid;
		/* prettier-ignore */
		grid-template-columns:
      [carousel-gutter] var(--_carousel-gutters)
      1fr
      [carousel-gutter] var(--_carousel-gutters);
		grid-template-rows: [carousel-scroller] 1fr;
	}

	.carousel-scroller {
		grid-row: 1;
		grid-column: 1/-1;

		display: grid;
		grid-auto-columns: 100%;
		grid-auto-flow: column;
		align-items: center;
		column-gap: 1rem;

		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-behavior: smooth;
		scroll-snap-type: x mandatory;
		scroll-snap-stop: always;

		scroll-padding-inline: var(--_carousel-gutters);
		padding-inline: var(--_carousel-gutters);

		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	article {
		border: 2px solid;
		border-radius: 4px;
		padding: 1rem;

		scroll-snap-align: center;
	}

	h2 {
		margin-block: 0 1rem;
	}

	ul {
		margin-block: 0;
		padding-inline-start: 1rem;
	}
</style>
