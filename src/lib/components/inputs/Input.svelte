<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'

	type InputProps = Omit<HTMLInputAttributes, 'placeholder'> & {
		id: string
		label: string
	}

	let { id, label, value = $bindable(), ...inputProps }: InputProps = $props()
</script>

<div>
	<label class="typescale-body-large" for={id}>{label}</label>
	<input class="typescale-body-large" placeholder=" " {id} bind:value {...inputProps} />
</div>

<style>
	div {
		--_padding-inline: 0.5rem;
		--_padding-block: 0.5rem;
		--_bg-color: var(--current-surface, var(--color-surface));

		position: relative;
	}

	label {
		color: var(--color-on-surface-variant);
		cursor: text;
		left: var(--_padding-inline);
		padding: 0.25em;
		position: absolute;
		top: 50%;
		transform-origin: left center;
		translate: 0 -50%;
		transition: 0.2s;
		transition-property: background-color, scale, translate;

		&:has(~ input:focus),
		&:has(~ input:not(:placeholder-shown)) {
			background-color: var(--_bg-color);
			scale: 0.7;
			translate: 0 -115%;
		}
	}

	input {
		background: var(--_bg-color);
		border: var(--border-1) solid var(--color-outline);
		border-radius: var(--corner-extra-small);
		caret-color: var(--color-primary);
		color: var(--color-on-surface);
		padding: var(--_padding-block) var(--_padding-inline);
		width: 100%;

		&[type='color'] {
			padding-block: 0;
		}

		&:focus {
			border-color: var(--color-primary);
			outline: 1px solid var(--color-primary);
		}
	}
</style>
