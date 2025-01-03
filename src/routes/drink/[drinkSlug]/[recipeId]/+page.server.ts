import type { Ingredient, IngredientAndAmount, Serving } from '$lib/types'

import { eq, sql } from 'drizzle-orm'

import { createLogger } from '$lib/createLogger'
import { db } from '$lib/server/db/db'
import { drinkRecipeIngredients, ingredients, servingImages, servings } from '$lib/server/db/schema'

export async function load({ locals, parent }) {
	const { log, timeFnAsync } = createLogger(
		`/drink/[drinkSlug]/[recipeId] - +page.server`,
		locals.requestId
	)

	log('load')

	const { recipe } = await timeFnAsync('await parent', () => parent())

	const ingredientsPromise: Promise<IngredientAndAmount[]> = timeFnAsync(
		'select recipe ingredients',
		() =>
			db
				.select({
					id: drinkRecipeIngredients.id,
					amount: drinkRecipeIngredients.amount,
					ingredient: sql<Ingredient>`
						JSON_BUILD_OBJECT(
							'id', ${ingredients.id},
							'name', ${ingredients.name},
							'icon', ${ingredients.icon}
						)
				`
				})
				.from(drinkRecipeIngredients)
				.innerJoin(ingredients, eq(drinkRecipeIngredients.ingredientId, ingredients.id))
				.where(eq(drinkRecipeIngredients.drinkRecipeId, recipe.id))
				.groupBy(drinkRecipeIngredients.id, ingredients.id)
	)

	const servingsPromise: Promise<Serving[]> = timeFnAsync('select recipe servings', () =>
		db
			.select({
				id: servings.id,
				date: servings.date,
				rating: servings.rating,
				notes: servings.notes
				// images: sql<string[]>`ARRAY_AGG(${servingImages.imageUrl})`
			})
			.from(servings)
			.where(eq(servings.drinkRecipeId, recipe.id))
	)

	return {
		ingredients: ingredientsPromise,
		servings: servingsPromise
	}
}
