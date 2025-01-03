<script lang="ts">
	import Dropzone from 'svelte-file-dropzone'
	import { superForm } from 'sveltekit-superforms'

	import Input from '$lib/components/inputs/Input.svelte'
	import Textarea from '$lib/components/inputs/Textarea.svelte'
	import InnerLayout from '$lib/components/layout/InnerLayout.svelte'
	import { acceptedImageTypes, maxImageFileSize } from '$lib/z/servingSchemas'

	let { data } = $props()

	const { drink, recipe } = data

	let { form, constraints } = superForm(data.form)
</script>

<div>
	<InnerLayout>
		<form>
			<input type="hidden" name="drinkId" value={drink.id} />
			<input type="hidden" name="recipeId" value={recipe.id} />

			<Input
				id="date"
				name="date"
				type="date"
				label="Datum"
				bind:value={$form.date}
				{...$constraints.date}
			/>

			<Input
				type="range"
				id="rating"
				name="rating"
				label="Betyg"
				bind:value={$form.rating}
				{...$constraints.rating}
			/>

			<Textarea
				id="notes"
				name="notes"
				label="Kommentar"
				bind:value={$form.notes}
				{...$constraints.notes}
			/>

			<Input
				type="file"
				id="images"
				name="images"
				label="Bilder"
				accept={acceptedImageTypes.join(',')}
				{...$constraints.images}
			/>
		</form>
	</InnerLayout>
</div>

<style>
	div {
		--current-surface: var(--color-surface-variant);
		--current-on-surface: var(--color-on-surface-variant);

		background-color: var(--current-surface);
	}

	form {
		display: grid;
		gap: var(--spacing-24);
		padding-block: var(--spacing-32);
	}
</style>
