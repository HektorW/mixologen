<script lang="ts">
	import Button, { ButtonVariant } from '$lib/components/buttons/Button.svelte'
	import ImageGrid from '$lib/components/ImageGrid.svelte'
	import Card, { CardEmphasis } from '$lib/components/layout/Card.svelte'
	import FloatingNavigation from '$lib/components/layout/FloatingNavigation.svelte'
	import InnerLayout from '$lib/components/layout/InnerLayout.svelte'
	import Loader from '$lib/components/Loader.svelte'
	import Rating from '$lib/components/Rating.svelte'
	import Recipe from '$lib/components/Recipe.svelte'
	import RecipePicker from '$lib/components/RecipePicker.svelte'

	let { data } = $props()
</script>

<main>
	<InnerLayout --row-gap="var(--spacing-32)">
		{#await data.recipesPromise}
			<Loader />
		{:then recipes}
			<RecipePicker drink={data.drink} {recipes} selectedRecipeId={data.recipe.id} />
		{/await}

		<div style:view-transition-name="recipe-card">
			<Card emphasis={CardEmphasis.Tertiary}>
				{#await data.ingredients}
					<Loader />
				{:then ingredients}
					<Recipe
						recipe={{
							...data.recipe,
							ingredientsAndAmounts: ingredients
						}}
					/>
				{/await}
			</Card>
		</div>

		<div style:view-transition-name="servings-card">
			<Card emphasis={CardEmphasis.Low}>
				<h2>Serveringar</h2>

				{#await data.servings}
					<Loader />
				{:then servings}
					{#if servings.length > 0}
						{#each servings as serving}
							<article>
								{#if serving.images}
									<ImageGrid images={serving.images} />
								{/if}

								<Rating value={serving.rating} />

								<p>{serving.notes}</p>
							</article>
						{/each}
					{:else}
						<p>Detta receptet är inte testat än.</p>

						<Button
							variant={ButtonVariant.Tonal}
							href="/drink/{data.drink.slug}/{data.recipe.id}/add-serving"
						>
							Lägg till en servering
						</Button>
					{/if}
				{/await}
			</Card>
		</div>
	</InnerLayout>
</main>

<style>
	main {
		padding-block: var(--spacing-32);
	}

	div {
		display: grid;
		gap: var(--spacing-32);
	}
</style>
