<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { LayoutData } from './$types'

	import ImageCarousel from '$lib/components/ImageCarousel.svelte'
	import ImageGrid from '$lib/components/ImageGrid.svelte'
	import InnerLayout from '$lib/components/layout/InnerLayout.svelte'
	import { viewTransitionDrinkName } from '$lib/viewTransitions'

	let { data, children }: { data: LayoutData; children: Snippet } = $props()

	// const drink = data.drink
	// const recipes = drink.recipes
	// const allServings = recipes.flatMap((recipe) => recipe.servings)
	// const allImages = allServings.flatMap((serving) => serving.images)
</script>

<div
	style:--color-primary={data.drinkTheme?.light.primary}
	style:--color-on-primary={data.drinkTheme?.light.onPrimary}
	style:--color-primary-container={data.drinkTheme?.light.primaryContainer}
	style:--color-on-rimary-container={data.drinkTheme?.light.onPrimaryContainer}
	style:--color-secondary={data.drinkTheme?.light.secondary}
	style:--color-on-secondary={data.drinkTheme?.light.onSecondary}
	style:--color-secondary-container={data.drinkTheme?.light.secondaryContainer}
	style:--color-on-secondary-container={data.drinkTheme?.light.onSecondaryContainer}
	style:--color-tertiary={data.drinkTheme?.light.tertiary}
	style:--color-on-tertiary={data.drinkTheme?.light.onTertiary}
	style:--color-tertiary-container={data.drinkTheme?.light.tertiaryContainer}
	style:--color-on-tertiary-container={data.drinkTheme?.light.onTertiaryContainer}
	style:--color-error={data.drinkTheme?.light.error}
	style:--color-on-error={data.drinkTheme?.light.onError}
	style:--color-error-container={data.drinkTheme?.light.errorContainer}
	style:--color-on-error-container={data.drinkTheme?.light.onErrorContainer}
	style:--color-background={data.drinkTheme?.light.background}
	style:--color-on-background={data.drinkTheme?.light.onBackground}
	style:--color-surface={data.drinkTheme?.light.surface}
	style:--color-on-surface={data.drinkTheme?.light.onSurface}
	style:--color-surface-variant={data.drinkTheme?.light.surfaceVariant}
	style:--color-on-surface-variant={data.drinkTheme?.light.onSurfaceVariant}
	style:--color-outline={data.drinkTheme?.light.outline}
	style:--color-outline-variant={data.drinkTheme?.light.outlineVariant}
	style:--color-shadow={data.drinkTheme?.light.shadow}
	style:--color-scrim={data.drinkTheme?.light.scrim}
	style:--color-inverse-surface={data.drinkTheme?.light.inverseSurface}
	style:--color-inverse-on-surface={data.drinkTheme?.light.inverseOnSurface}
	style:--color-inverse-primary={data.drinkTheme?.light.inversePrimary}
	style:--color-surface-container-highest={data.drinkTheme?.light.surfaceContainerHighest}
	style:--color-surface-container-high={data.drinkTheme?.light.surfaceContainerHigh}
	style:--color-surface-container={data.drinkTheme?.light.surfaceContainer}
	style:--color-surface-container-low={data.drinkTheme?.light.surfaceContainerLow}
	style:--color-surface-container-lowest={data.drinkTheme?.light.surfaceContainerLowest}
>
	<header>
		{#if data.images.length > 0}
			<div class="image-carousel">
				<ImageCarousel items={data.images.map((imageSrc) => ({ imageSrc, title: '5 / 10' }))} />
			</div>
		{/if}

		<InnerLayout>
			<h1><span {...viewTransitionDrinkName(data.drink)}>{data.drink.name}</span></h1>
		</InnerLayout>
	</header>

	{@render children()}
</div>

<style>
	.image-carousel {
		padding-block: 1rem;
	}

	header {
		background-color: var(--color-primary-container);
		color: var(--color-on-primary-container);
	}
</style>
