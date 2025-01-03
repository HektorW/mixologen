import { and, eq } from 'drizzle-orm'

import { db } from '../db'
import { drinkRecipes, drinks } from '../schema'

export async function getIsValidDrinkIdAndRecipeId({
	drinkId,
	recipeId
}: {
	drinkId: number
	recipeId: number
}) {
	const [mathingRow] = await db
		.select()
		.from(drinkRecipes)
		.innerJoin(drinks, eq(drinks.id, drinkRecipes.drinkId))
		.where(and(eq(drinkRecipes.id, recipeId), eq(drinks.id, drinkId)))
		.limit(1)

	return Boolean(mathingRow)
}
