import type { DrinkWithRecipeIds, Ingredient } from '$lib/types'

import { eq, sql } from 'drizzle-orm'

import { createLogger } from '$lib/createLogger'
import { db } from '$lib/server/db/db'
import { drinkRecipeIngredients, drinkRecipes, drinks, ingredients } from '$lib/server/db/schema'

export async function load({ locals }) {
	const { log, timeFnAsync } = createLogger(`/ - +page.server`, locals.requestId)

	const rawIngredientsPromise = timeFnAsync('load ingredients', () =>
		db
			.select({
				drinkId: drinks.id,
				ingredients: sql<Ingredient>`JSON_AGG(
				JSON_BUILD_OBJECT(
					'id', ${ingredients.id},
					'name', ${ingredients.name},
					'icon', ${ingredients.icon},
					'hasVariants', ${ingredients.hasVariants}
				)
			)`
			})
			.from(ingredients)
			.innerJoin(drinkRecipeIngredients, eq(ingredients.id, drinkRecipeIngredients.ingredientId))
			.innerJoin(drinkRecipes, eq(drinkRecipeIngredients.drinkRecipeId, drinkRecipes.id))
			.innerJoin(drinks, eq(drinkRecipes.drinkId, drinks.id))
			.groupBy(drinks.id)
	)

	const rawDrinks = await timeFnAsync('load drinks', () =>
		db
			.select({
				id: drinks.id,
				slug: drinks.slug,
				name: drinks.name,
				description: drinks.description,
				color: drinks.color,
				recipeIds: sql<number[]>`ARRAY_AGG(${drinkRecipes.id})`
			})
			.from(drinks)
			.leftJoin(drinkRecipes, eq(drinks.id, drinkRecipes.drinkId))
			.groupBy(drinks.id)
	)

	const drinkResults: DrinkWithRecipeIds[] = rawDrinks

	log('drinks', { drinkResults })

	return {
		drinks: drinkResults,
		drinkIngredients: rawIngredientsPromise
	}
}
