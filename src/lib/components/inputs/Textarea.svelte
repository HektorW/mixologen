<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements'

	type TextareaProps = Omit<HTMLTextareaAttributes, 'placeholder'> & {
		id: string
		label: string
	}

	let { id, label, value = $bindable(), rows = 4, ...textareaProps }: TextareaProps = $props()
</script>

<div>
	<label class="typescale-body-large" for={id}>{label}</label>
	<textarea class="typescale-body-large" {id} {rows} placeholder=" " bind:value {...textareaProps}
	></textarea>
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
		left: var(--_padding-inline);
		padding: 0.25em;
		position: absolute;
		top: 1.2em;
		transform-origin: left center;
		translate: 0 -50%;
		transition: 0.2s;
		transition-property: background-color, scale, translate;

		&:has(~ textarea:focus),
		&:has(~ textarea:not(:placeholder-shown)) {
			background-color: var(--_bg-color);
			scale: 0.7;
			translate: 0 -110%;
		}
	}

	textarea {
		background: var(--_bg-color);
		border: var(--border-1) solid var(--color-outline);
		border-radius: var(--corner-extra-small);
		caret-color: var(--color-primary);
		color: var(--color-on-surface);
		padding: var(--_padding-block) var(--_padding-inline);
		resize: vertical;
		width: 100%;

		&:focus {
			border-color: var(--color-primary);
			outline: 1px solid var(--color-primary);
		}
	}
</style>
