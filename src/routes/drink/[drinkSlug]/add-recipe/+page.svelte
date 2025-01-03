<script lang="ts">
	import type { PageData } from './$types'

	import { afterNavigate, goto } from '$app/navigation'
	import SuperDebug, { superForm } from 'sveltekit-superforms'

	import Button, { ButtonVariant } from '$lib/components/buttons/Button.svelte'
	import FormErrors from '$lib/components/forms/FormErrors.svelte'
	import Input from '$lib/components/inputs/Input.svelte'
	import Textarea from '$lib/components/inputs/Textarea.svelte'
	import InnerLayout from '$lib/components/layout/InnerLayout.svelte'

	let { data }: { data: PageData } = $props()

	const { drink, existingIngredients } = data

	const { form, allErrors } = superForm(data.form, {
		dataType: 'json'
	})

	let isBackNavigationOnCancel = $state(false)

	let ingredientTempIds = $state<string[]>([crypto.randomUUID()])
	let instructionTempIds = $state<string[]>([crypto.randomUUID()])

	afterNavigate(({ from }) => {
		isBackNavigationOnCancel = from?.route?.id === '/drink/[drinkSlug]/[recipeId]'
		console.log('afterNavigate', { isBackNavigationOnCancel, from })
	})

	function handleAddIngredient() {
		ingredientTempIds.push(crypto.randomUUID())
	}

	function handleRemoveIngredient(ingredientTempId: string) {
		const index = ingredientTempIds.indexOf(ingredientTempId)
		if (index === -1) return

		ingredientTempIds.splice(index, 1)
		form.update(($form) => {
			$form.ingredientAmounts.splice(index, 1)
			$form.ingredientNames.splice(index, 1)
			return $form
		})
	}

	function handleAddInstruction() {
		instructionTempIds.push(crypto.randomUUID())
	}

	function handleRemoveInstruction(instructionTempId: string) {
		const index = instructionTempIds.indexOf(instructionTempId)
		if (index === -1) return

		instructionTempIds.splice(index, 1)
		form.update(($form) => {
			$form.instructions.splice(index, 1)
			return $form
		})
	}
</script>

<section>
	<InnerLayout>
		<h2>Lägg till ett nytt recept</h2>

		{#if $allErrors.length > 0}
			<FormErrors errors={$allErrors} />
		{/if}

		<form id="add-recipe-form" method="post">
			<input type="hidden" name="drinkId" bind:value={$form.drinkId} />

			<Input
				id="name"
				name="name"
				label="Receptets namn"
				type="text"
				autocomplete="off"
				required
				bind:value={$form.name}
			/>

			<fieldset>
				<legend>Ingredienser</legend>

				<div class="ingredients-grid">
					{#each ingredientTempIds as ingredientTempId, i}
						<Input
							id="ingredientAmounts-{ingredientTempId}"
							type="text"
							name="ingredientAmounts"
							label="Mängd"
							required
							bind:value={$form.ingredientAmounts[i]}
						/>
						<Input
							id="ingredientNames-{ingredientTempId}"
							type="text"
							list="ingredients"
							name="ingredientNames"
							label="Ingrediens"
							required
							bind:value={$form.ingredientNames[i]}
						/>

						<Button
							type="button"
							variant={ButtonVariant.Outlined}
							iconStart="material-symbols:delete-forever"
							onclick={() => handleRemoveIngredient(ingredientTempId)}
						></Button>
					{/each}
				</div>

				<Button type="button" variant={ButtonVariant.Tonal} onclick={handleAddIngredient}>
					Lägg till ingrediens
				</Button>

				<datalist id="ingredients">
					{#each existingIngredients as ingredient}
						<option value={ingredient.name}></option>
					{/each}
				</datalist>
			</fieldset>

			<fieldset>
				<legend>Instruktioner</legend>

				<ol>
					{#each instructionTempIds as instructionTempId, i}
						<li>
							<span>
								<Input
									id="instructions-{instructionTempId}"
									type="text"
									name="instructions"
									label="Instruktion"
									required
									bind:value={$form.instructions[i]}
								/>

								<Button
									variant={ButtonVariant.Outlined}
									type="button"
									iconStart="material-symbols:delete-forever"
									onclick={() => handleRemoveInstruction(instructionTempId)}
								></Button>
							</span>
						</li>
					{/each}
				</ol>

				<Button variant={ButtonVariant.Tonal} type="button" onclick={handleAddInstruction}
					>Lägg till instruktion</Button
				>
			</fieldset>

			<Textarea id="notes" name="notes" label="Bra att veta om receptet" bind:value={$form.notes}
			></Textarea>

			<Input
				id="source-url"
				name="sourceUrl"
				label="Källa (url)"
				type="url"
				bind:value={$form.sourceUrl}
			/>

			<Button
				type="button"
				variant={ButtonVariant.Outlined}
				iconStart="solar:alt-arrow-left-outline"
				href="/drink/{drink.slug}"
				onclick={(event) => {
					console.log('cancel', { isBackNavigationOnCancel })
					if (isBackNavigationOnCancel) {
						event.preventDefault()
						history.back()
					}
				}}
			>
				Avbryt
			</Button>

			<Button variant={ButtonVariant.Filled} type="submit" form="add-recipe-form">
				Spara recept
			</Button>
		</form>

		<!-- <SuperDebug data={$form} /> -->
	</InnerLayout>
</section>

<style>
	section {
		--current-surface: var(--color-surface-container);
		--current-on-surface: var(--color-on-surface-container);

		background-color: var(--current-surface);
		color: var(--current-on-surface);
	}

	form {
		display: grid;
		gap: 1.5rem;
	}

	fieldset {
		border-color: var(--color-outline-variant);
		display: grid;
		gap: 1rem;
		padding: 2rem;
	}

	.ingredients-grid {
		display: grid;
		grid-template-columns: 1fr 2fr auto;
		gap: 1rem;
	}

	ol {
		display: grid;
		gap: 1rem;
		padding-inline-start: 1rem;

		li {
			padding-inline-start: 0.5rem;

			& > span {
				display: grid;
				grid-template-columns: 1fr auto;
				gap: 1rem;
			}
		}
	}
</style>
