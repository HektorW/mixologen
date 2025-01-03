<script lang="ts" module>
	export const CardVariant = {
		Elevated: 'Elevated',
		Filled: 'Filled',
		Outlined: 'Outlined'
	} as const

	export const CardEmphasis = {
		Highest: 'Highest',
		High: 'High',
		Neutral: 'Neutral',
		Low: 'Low',
		Lowest: 'Lowest',
		Primary: 'Primary',
		Secondary: 'Secondary',
		Tertiary: 'Tertiary',
		Error: 'Error'
	} as const
</script>

<script lang="ts">
	import type { Snippet } from 'svelte'

	type CardProps = {
		children: Snippet

		variant?: keyof typeof CardVariant
		emphasis?: keyof typeof CardEmphasis
	}

	let {
		children,

		variant = CardVariant.Filled,
		emphasis = CardEmphasis.Neutral
	}: CardProps = $props()
</script>

<div
	class="card"
	class:emphasis--highest={emphasis === CardEmphasis.Highest}
	class:emphasis--high={emphasis === CardEmphasis.High}
	class:emphasis--neutral={emphasis === CardEmphasis.Neutral}
	class:emphasis--low={emphasis === CardEmphasis.Low}
	class:emphasis--lowest={emphasis === CardEmphasis.Lowest}
	class:emphasis--primary={emphasis === CardEmphasis.Primary}
	class:emphasis--secondary={emphasis === CardEmphasis.Secondary}
	class:emphasis--tertiary={emphasis === CardEmphasis.Tertiary}
	class:emphasis--error={emphasis === CardEmphasis.Error}
	class:variant--elevated={variant === CardVariant.Elevated}
	class:variant--filled={variant === CardVariant.Filled}
	class:variant--outlined={variant === CardVariant.Outlined}
>
	{@render children()}
</div>

<style>
	.card {
		--_surface-color: var(--color-surface-container);
		--_on-color: var(--color-on-surface-container);

		--current-surface: var(--_surface-color);
		--current-on-surface: var(--_on-color);

		border-radius: var(--corner-medium);
		color: var(--_on-color);
		padding: var(--spacing-16);
	}

	.variant--elevated {
		background-color: var(--_surface-color);
		box-shadow: var(--elevation-1);
	}
	.variant--filled {
		background-color: var(--_surface-color);
	}

	.variant--outlined {
		border: 1px solid var(--color-outline-variant);
	}

	.emphasis--highest {
		--_surface-color: var(--color-surface-container-highest);
	}

	.emphasis--high {
		--_surface-color: var(--color-surface-container-high);
	}

	.emphasis--neutral {
		--_surface-color: var(--color-surface-container);
	}

	.emphasis--low {
		--_surface-color: var(--color-surface-container-low);
	}

	.emphasis--lowest {
		--_surface-color: var(--color-surface-container-lowest);
	}

	.emphasis--primary {
		--_surface-color: var(--color-primary-container);
		--_on-color: var(--color-on-primary-container);
	}

	.emphasis--secondary {
		--_surface-color: var(--color-secondary-container);
		--_on-color: var(--color-on-secondary-container);
	}

	.emphasis--tertiary {
		--_surface-color: var(--color-tertiary-container);
		--_on-color: var(--color-on-tertiary-container);
	}

	.emphasis--error {
		--_surface-color: var(--color-error-container);
		--_on-color: var(--color-on-error-container);
	}
</style>
