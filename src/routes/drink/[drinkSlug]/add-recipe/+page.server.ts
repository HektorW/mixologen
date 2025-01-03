import type { Ingredient } from '$lib/types'

import { redirect } from '@sveltejs/kit'
import { eq, inArray } from 'drizzle-orm'
import { fail, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

import { db } from '$lib/server/db/db'
import { drinkRecipeIngredients, drinkRecipes, drinks, ingredients } from '$lib/server/db/schema'
import { addRecipeSchema } from '$lib/z/recipeSchema.js'

function log(message: string, ...args: any[]) {
	console.log(`/drink/[drinkSlug]/add-recipe - +page.server - ${message}`, ...args)
}

export async function load({ parent }) {
	const { drink } = await parent()

	const form = await superValidate(
		{
			drinkId: drink.id
		},
		zod(addRecipeSchema)
	)

	const existingIngredients: Ingredient[] = await db
		.select({
			id: ingredients.id,
			name: ingredients.name,
			icon: ingredients.icon
		})
		.from(ingredients)

	return {
		existingIngredients,
		form
	}
}

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(addRecipeSchema))

		if (!form.valid) {
			log('Form validation failed', { form })
			return fail(400, { form })
		}

		log('Adding new recipe', { form })

		/* prettier-ignore */
		const [drink] = await db
      .select()
      .from(drinks)
      .where(eq(drinks.id, form.data.drinkId))

		if (!drink) {
			log('Drink not found', { drinkId: form.data.drinkId })
			return fail(400, { form: { errors: { drinkId: 'Drink not found' } } })
		}

		const existingIngredients = await db
			.select()
			.from(ingredients)
			.where(inArray(ingredients.name, form.data.ingredientNames))

		const newIngredients = form.data.ingredientNames.filter(
			(name) => !existingIngredients.some((ingredient) => ingredient.name === name)
		)

		if (newIngredients.length > 0) {
			log('Adding new ingredients', { newIngredients })

			const results = await db
				.insert(ingredients)
				.values(newIngredients.map((name) => ({ name: name.trim() })))
				.returning()
			existingIngredients.push(...results)
		}

		log('Adding  recipe', { data: form.data })
		const [recipe] = await db
			.insert(drinkRecipes)
			.values({
				drinkId: drink.id,
				name: form.data.name.trim(),
				instructions: form.data.instructions.map((instruction) => instruction.trim()),
				notes: form.data.notes?.trim()
			})
			.returning()

		const insertIngredients = form.data.ingredientNames
			.map((name, index) => {
				const ingredientId = existingIngredients.find((ingredient) => ingredient.name === name)?.id
				if (!ingredientId) {
					return null
				}

				return { ingredientId, amount: form.data.ingredientAmounts[index] }
			})
			.filter((ingredient) => ingredient !== null)

		log('Adding recipe ingredients', { insertIngredients })
		await db.insert(drinkRecipeIngredients).values(
			insertIngredients.map(({ ingredientId, amount }) => ({
				drinkRecipeId: recipe.id,
				ingredientId: ingredientId,
				amount: amount.trim()
			}))
		)

		log('Redirecting to new recipe', { id: recipe.id })
		redirect(301, `/drink/${drink.slug}/${recipe.id}`)
	}
}
