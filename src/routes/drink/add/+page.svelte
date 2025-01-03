<script lang="ts">
	import type { PageData } from './$types'

	import { onDestroy } from 'svelte'
	import { superForm } from 'sveltekit-superforms'

	import Button, { ButtonVariant } from '$lib/components/buttons/Button.svelte'
	import Input from '$lib/components/inputs/Input.svelte'
	import Textarea from '$lib/components/inputs/Textarea.svelte'
	import Card, { CardEmphasis } from '$lib/components/layout/Card.svelte'
	import FloatingNavigation from '$lib/components/layout/FloatingNavigation.svelte'
	import InnerLayout from '$lib/components/layout/InnerLayout.svelte'
	import { previewTheme } from '$lib/globalClientState/previewTheme.svelte'
	import { slugify } from '$lib/slugify'

	let { data }: { data: PageData } = $props()

	let { form, constraints } = superForm(data.form)

	let isSlugManuallyChanged = $state(false)
	let previewColor = $state<string | null>(null)

	$effect(() => {
		const abortController = new AbortController()

		async function fetchPreviewTheme() {
			if (!previewColor) {
				return
			}

			const previewColorWithoutHash = previewColor.slice(1)

			const previewThemeResponse = await fetch(`/api/theme/${previewColorWithoutHash}`, {
				signal: abortController.signal
			})

			if (!previewThemeResponse.ok) {
				return
			}

			previewTheme.value = await previewThemeResponse.json()
		}

		fetchPreviewTheme()

		return () => {
			abortController.abort()
		}
	})

	onDestroy(() => {
		previewTheme.value = null
	})

	function onColorChange(event: { currentTarget: HTMLInputElement }) {
		previewColor = event.currentTarget.value
	}
</script>

<header>
	<InnerLayout>
		<h1>Ny drink</h1>
	</InnerLayout>
</header>

<main>
	<InnerLayout>
		<Card variant="Filled">
			<form id="add-drink-form" method="POST">
				<Input
					id="drink-name"
					name="name"
					type="text"
					autocomplete="off"
					label="Drinkens namn"
					bind:value={$form.name}
					{...$constraints.name}
					oninput={(event) => {
						if (!isSlugManuallyChanged) {
							$form.slug = slugify(event.currentTarget.value)
						}
					}}
				/>

				<Input
					id="drink-slug"
					type="text"
					name="slug"
					autocomplete="off"
					label="Slug"
					bind:value={$form.slug}
					{...$constraints.slug}
					oninput={(event) => {
						isSlugManuallyChanged = event.currentTarget.value !== slugify($form.name)
					}}
				/>

				<Textarea
					id="drink-description"
					name="description"
					label="Kort beskrivning"
					bind:value={$form.description}
					{...$constraints.description}
				/>

				<Input
					id="drink-color"
					type="color"
					name="color"
					label="Färg"
					bind:value={$form.color}
					{...$constraints.color}
					onchange={onColorChange}
				/>

				<Button variant={ButtonVariant.Filled} type="submit">Lägg till</Button>

				<!-- <SuperDebug data={$form} /> -->
			</form>
		</Card>

		<Card>
			<h2>Temapreview</h2>

			<div class="theme-preview">
				<div class="color-swatch" style:--color="var(--color-primary)"></div>
				<div class="color-swatch" style:--color="var(--color-secondary)"></div>
				<div class="color-swatch" style:--color="var(--color-tertiary)"></div>

				<div class="color-swatch" style:--color="var(--color-primary-container)"></div>
				<div class="color-swatch" style:--color="var(--color-secondary-container)"></div>
				<div class="color-swatch" style:--color="var(--color-tertiary-container)"></div>
			</div>
		</Card>
	</InnerLayout>
</main>

<!-- <FloatingNavigation>
	<Button variant={ButtonVariant.Filled} form="add-drink-form" type="submit">Spara</Button>
</FloatingNavigation> -->

<style>
	header {
		background-color: var(--color-primary-container);
		color: var(--color-on-primary-container);
	}

	main {
		padding-block: var(--spacing-32);
	}

	form {
		display: grid;
		gap: 1.5rem;
	}

	.theme-preview {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.color-swatch {
		aspect-ratio: 1;
		background-color: var(--color);
		border-radius: var(--corner-full);
	}
</style>
