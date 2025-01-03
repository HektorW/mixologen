<script lang="ts">
	import type { Snippet } from 'svelte'

	import { page } from '$app/state'

	import { previewTheme } from '$lib/globalClientState/previewTheme.svelte'

	let { children }: { children: Snippet } = $props()

	let drinkTheme = $derived(previewTheme.value?.light ?? page.data.drinkTheme?.light ?? null)

	$effect(() => {
		if (drinkTheme) {
			document.body.style.setProperty('--color-surface', drinkTheme.surface)
			document.body.style.setProperty('--color-on-surface', drinkTheme.onSurface)
			document.body.style.setProperty('--color-primary', drinkTheme.primary)
			document.body.style.setProperty('--color-secondary', drinkTheme.secondary)
			document.body.style.setProperty('--color-tertiary', drinkTheme.tertiary)
		} else {
			document.body.style.removeProperty('--color-surface')
			document.body.style.removeProperty('--color-on-surface')
			document.body.style.removeProperty('--color-primary')
			document.body.style.removeProperty('--color-secondary')
			document.body.style.removeProperty('--color-tertiary')
		}
	})
</script>

<div
	style:--color-primary={drinkTheme?.primary}
	style:--color-on-primary={drinkTheme?.onPrimary}
	style:--color-primary-container={drinkTheme?.primaryContainer}
	style:--color-on-rimary-container={drinkTheme?.onPrimaryContainer}
	style:--color-secondary={drinkTheme?.secondary}
	style:--color-on-secondary={drinkTheme?.onSecondary}
	style:--color-secondary-container={drinkTheme?.secondaryContainer}
	style:--color-on-secondary-container={drinkTheme?.onSecondaryContainer}
	style:--color-tertiary={drinkTheme?.tertiary}
	style:--color-on-tertiary={drinkTheme?.onTertiary}
	style:--color-tertiary-container={drinkTheme?.tertiaryContainer}
	style:--color-on-tertiary-container={drinkTheme?.onTertiaryContainer}
	style:--color-error={drinkTheme?.error}
	style:--color-on-error={drinkTheme?.onError}
	style:--color-error-container={drinkTheme?.errorContainer}
	style:--color-on-error-container={drinkTheme?.onErrorContainer}
	style:--color-background={drinkTheme?.background}
	style:--color-on-background={drinkTheme?.onBackground}
	style:--color-surface={drinkTheme?.surface}
	style:--color-on-surface={drinkTheme?.onSurface}
	style:--color-surface-variant={drinkTheme?.surfaceVariant}
	style:--color-on-surface-variant={drinkTheme?.onSurfaceVariant}
	style:--color-outline={drinkTheme?.outline}
	style:--color-outline-variant={drinkTheme?.outlineVariant}
	style:--color-shadow={drinkTheme?.shadow}
	style:--color-scrim={drinkTheme?.scrim}
	style:--color-inverse-surface={drinkTheme?.inverseSurface}
	style:--color-inverse-on-surface={drinkTheme?.inverseOnSurface}
	style:--color-inverse-primary={drinkTheme?.inversePrimary}
	style:--color-surface-dim={drinkTheme?.surfaceDim}
	style:--color-surface-bright={drinkTheme?.surfaceBright}
	style:--color-surface-container-highest={drinkTheme?.surfaceContainerHighest}
	style:--color-surface-container-high={drinkTheme?.surfaceContainerHigh}
	style:--color-surface-container={drinkTheme?.surfaceContainer}
	style:--color-surface-container-low={drinkTheme?.surfaceContainerLow}
	style:--color-surface-container-lowest={drinkTheme?.surfaceContainerLowest}
>
	{@render children()}
</div>

<style>
	:global(:root) {
		/* --color-surface-tint: rgb(141 78 43);
		--color-primary-fixed: rgb(255 219 203);
		--color-on-primary-fixed: rgb(52 17 0);
		--color-primary-fixed-dim: rgb(255 182 145);
		--color-on-primary-fixed-variant: rgb(112 55 22);
		--color-secondary-fixed: rgb(255 219 203);
		--color-on-secondary-fixed: rgb(44 22 11);
		--color-secondary-fixed-dim: rgb(230 190 172);
		--color-on-secondary-fixed-variant: rgb(92 64 51);
		--color-tertiary-fixed: rgb(236 228 170);
		--color-on-tertiary-fixed: rgb(31 28 0);
		--color-tertiary-fixed-dim: rgb(207 200 144);
		--color-on-tertiary-fixed-variant: rgb(76 72 28); */

		--color-primary: rgb(141 78 43);
		--color-on-primary: rgb(255 255 255);
		--color-primary-container: rgb(255 219 203);
		--color-on-primary-container: rgb(52 17 0);
		--color-secondary: rgb(118 88 73);
		--color-on-secondary: rgb(255 255 255);
		--color-secondary-container: rgb(255 219 203);
		--color-on-secondary-container: rgb(44 22 11);
		--color-tertiary: rgb(101 96 49);
		--color-on-tertiary: rgb(255 255 255);
		--color-tertiary-container: rgb(236 228 170);
		--color-on-tertiary-container: rgb(31 28 0);
		--color-error: rgb(186 26 26);
		--color-on-error: rgb(255 255 255);
		--color-error-container: rgb(255 218 214);
		--color-on-error-container: rgb(65 0 2);
		--color-background: rgb(255 248 246);
		--color-on-background: rgb(34 26 22);
		--color-surface: rgb(255 248 246);
		--color-on-surface: rgb(34 26 22);
		--color-surface-variant: rgb(244 222 213);
		--color-on-surface-variant: rgb(82 68 61);
		--color-outline: rgb(133 115 108);
		--color-outline-variant: rgb(215 194 185);
		--color-shadow: rgb(0 0 0);
		--color-scrim: rgb(0 0 0);
		--color-inverse-surface: rgb(56 46 42);
		--color-inverse-on-surface: rgb(255 237 230);
		--color-inverse-primary: rgb(255 182 145);
		--color-surface-dim: rgb(232 215 208);
		--color-surface-bright: rgb(255 248 246);
		--color-surface-container-lowest: rgb(255 255 255);
		--color-surface-container-low: rgb(255 241 235);
		--color-surface-container: rgb(252 234 227);
		--color-surface-container-high: rgb(246 229 221);
		--color-surface-container-highest: rgb(240 223 216);

		--corner-none: 0;
		--corner-extra-small: 4px;
		--corner-small: 8px;
		--corner-medium: 12px;
		--corner-large: 16px;
		--corner-extra-large: 28px;
		--corner-full: 1000px;

		--border-1: 1px;

		--elevation-0: 0 0 0 0 rgba(0, 0, 0, 0);
		--elevation-1: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);

		--font-family-heading: 'Playfair Display', serif;
		--font-family-lato: 'Lato', sans-serif;
		--font-family-text: 'Montserrat', sans-serif;
		--font-size: 16px;

		--typeface-brand: 'Playfair Display', serif;
		--typeface-plain: 'Montserrat', sans-serif;
		--typeface-label: 'Lato', sans-serif;

		--typescale-headline-large-font: var(--typeface-brand);
		--typescale-headline-large-size: 2rem;
		--typescale-headline-large-lineheight: 2.5rem;
		--typescale-headline-large-weight: 400;
		--typescale-headline-large-tracking: 0;

		--typescale-headline-medium-font: var(--typeface-brand);
		--typescale-headline-medium-size: 1.75rem;
		--typescale-headline-medium-lineheight: 2.25rem;
		--typescale-headline-medium-weight: 400;
		--typescale-headline-medium-tracking: 0;

		--typescale-headline-small-font: var(--typeface-brand);
		--typescale-headline-small-size: 1.5rem;
		--typescale-headline-small-lineheight: 2rem;
		--typescale-headline-small-weight: 400;
		--typescale-headline-small-tracking: 0;

		--typescale-body-large-font: var(--typeface-plain);
		--typescale-body-large-size: 1rem;
		--typescale-body-large-lineheight: 1.5rem;
		--typescale-body-large-weight: 400;
		--typescale-body-large-tracking: 0.03125em;

		--typescale-body-medium-font: var(--typeface-plain);
		--typescale-body-medium-size: 0.875rem;
		--typescale-body-medium-lineheight: 1.25rem;
		--typescale-body-medium-weight: 400;
		--typescale-body-medium-tracking: 0.03125em;

		--typescale-label-large-font: var(--typeface-label);
		--typescale-label-large-size: 0.875rem;
		--typescale-label-large-lineheight: 1.25rem;
		--typescale-label-large-weight: 500;
		--typescale-label-large-tracking: 0.0625rem;

		--spacing-1: 0.25rem;
		--spacing-2: 0.5rem;
		--spacing-3: 0.75rem;
		--spacing-16: 1rem;
		--spacing-20: 1.25rem;
		--spacing-24: 1.5rem;
		--spacing-32: 2rem;

		--spacing-main-inline: 1rem;
		--spacing-main-block: 1rem;
		--spacing-main-bottom-nav: 4rem;
	}

	:global(html) {
		box-sizing: border-box;
		font-size: var(--font-size);
	}

	:global(*, *::before, *::after) {
		box-sizing: inherit;
	}

	:global(body) {
		background-color: var(--color-surface-container-highest);
		color: var(--color-on-surface);
		font-family: var(--font-family-text);
		margin: 0;
		padding: 0;
		min-height: 100dvh;

		/* background-image: radial-gradient(
				circle at left 10% bottom -50%,
				var(--color-tertiary) 1%,
				rgba(255, 255, 255, 0) 50%
			),
			radial-gradient(
				circle at right 15% top -50%,
				var(--color-primary) 1%,
				rgba(255, 255, 255, 0) 50%
			),
			radial-gradient(
				circle at right -45% top 50%,
				var(--color-secondary) 1%,
				rgba(255, 255, 255, 0) 50%
			);
		background-repeat: no-repeat; */
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-family: var(--font-family-heading);
		font-weight: 400;
	}

	:global(h1) {
		font-size: 3rem;
	}

	/* Typescale - Headline */
	:global(.typescale-headline-large) {
		font-family: var(--typescale-headline-large-font);
		font-size: var(--typescale-headline-large-size);
		font-weight: var(--typescale-headline-large-weight);
		letter-spacing: var(--typescale-headline-large-tracking);
		line-height: var(--typescale-headline-large-lineheight);
	}

	:global(.typescale-headline-medium) {
		font-family: var(--typescale-headline-medium-font);
		font-size: var(--typescale-headline-medium-size);
		font-weight: var(--typescale-headline-medium-weight);
		letter-spacing: var(--typescale-headline-medium-tracking);
		line-height: var(--typescale-headline-medium-lineheight);
	}

	:global(.typescale-headline-small) {
		font-family: var(--typescale-headline-small-font);
		font-size: var(--typescale-headline-small-size);
		font-weight: var(--typescale-headline-small-weight);
		letter-spacing: var(--typescale-headline-small-tracking);
		line-height: var(--typescale-headline-small-lineheight);
	}

	/* Typescale - Body */
	:global(.typescale-body-large) {
		font-family: var(--typescale-body-large-font);
		font-size: var(--typescale-body-large-size);
		font-weight: var(--typescale-body-large-weight);
		letter-spacing: var(--typescale-body-large-tracking);
		line-height: var(--typescale-body-large-lineheight);
	}

	:global(.typescale-body-medium) {
		font-family: var(--typescale-body-medium-font);
		font-size: var(--typescale-body-medium-size);
		font-weight: var(--typescale-body-medium-weight);
		letter-spacing: var(--typescale-body-medium-tracking);
		line-height: var(--typescale-body-medium-lineheight);
	}

	/* Typescale - Label */
	:global(.typescale-label-large) {
		font-family: var(--typescale-label-large-font);
		font-size: var(--typescale-label-large-size);
		font-weight: var(--typescale-label-large-weight);
		letter-spacing: var(--typescale-label-large-tracking);
		line-height: var(--typescale-label-large-lineheight);
	}
</style>
