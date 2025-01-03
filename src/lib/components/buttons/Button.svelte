<script lang="ts" module>
	export const ButtonVariant = {
		Filled: 'Filled',
		Tonal: 'Tonal',
		Outlined: 'Outlined',
		Text: 'Text'
	} as const
</script>

<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements'

	import Icon from '@iconify/svelte'

	type ButtonProps = HTMLButtonAttributes & {
		href?: string

		variant?: keyof typeof ButtonVariant

		iconStart?: string
		iconEnd?: string
	}

	let {
		children,

		href,

		variant = ButtonVariant.Filled,

		iconStart,
		iconEnd,

		...buttonProps
	}: ButtonProps = $props()

	let className = $derived(`button variant-${variant} typescale-label-large`)
</script>

{#snippet renderContent()}
	{#if iconStart}
		<Icon icon={iconStart} />
	{/if}
	{@render children?.()}
	{#if iconEnd}
		<Icon icon={iconEnd} />
	{/if}
{/snippet}

{#if href}
	<a class={className} {href} {...buttonProps as any}>
		{@render renderContent()}
	</a>
{:else}
	<button class={className} {...buttonProps}>
		{@render renderContent()}
	</button>
{/if}

<style>
	.button {
		--_bg-color: transparent;
		--_bg-color-hover: var(--_bg-color);
		--_bg-color-active: var(--_bg-color);

		--_border-color: var(--_bg-color);
		--_border-color-hover: var(--_border-color);
		--_border-color-active: var(--_border-color);

		--_text-color: inherit;
		--_text-color-hover: var(--_text-color);
		--_text-color-active: var(--_text-color);

		align-items: center;
		background-color: var(--_bg-color);
		border: var(--border-1) solid var(--_border-color);
		border-radius: var(--corner-full);
		color: var(--_text-color);
		cursor: pointer;
		display: flex;
		gap: 0.25em;
		justify-content: center;
		padding: 0.643em 1em;
		text-decoration: none;
	}

	.button:hover {
		background-color: var(--_bg-color-hover);
		border-color: var(--_border-color-hover);
		color: var(--_text-color-hover);
	}

	.button:active {
		background-color: var(--_bg-color-active);
		border-color: var(--_border-color-active);
		color: var(--_text-color-active);
	}

	.variant-Filled {
		--_bg-color: var(--color-primary);
		--_text-color: var(--color-on-primary);
	}

	.variant-Tonal {
		--_bg-color: var(--color-secondary-container);
		--_text-color: var(--color-on-secondary-container);
	}

	.variant-Outlined {
		--_border-color: var(--color-outline);
		--_text-color: var(--color-primary);
	}

	.variant-Text {
	}
</style>
