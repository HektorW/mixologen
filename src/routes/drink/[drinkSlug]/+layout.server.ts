import { error } from '@sveltejs/kit'
import { eq, sql } from 'drizzle-orm'

import { createLogger } from '$lib/createLogger.js'
import { db } from '$lib/server/db/db'
import { drinkRecipes, drinks, servingImages, servings } from '$lib/server/db/schema'
import { generateColorTheme } from '$lib/server/generateColorTheme'
import { type DrinkRecipeWithoutIngredientsAndServings, type DrinkWithoutRecipes } from '$lib/types'

export async function load({ locals, route, params }) {
	const { log, timeFn, timeFnAsync } = createLogger(
		`/drink/[drinkSlug] - +layout.server`,
		locals.requestId
	)

	log('load', { route })

	const [rawDrink] = await timeFnAsync('select drink by slug', () =>
		db.select().from(drinks).where(eq(drinks.slug, params.drinkSlug))
	)

	if (!rawDrink) {
		log('No drink found for slug', { slug: params.drinkSlug })
		error(404, 'Drink not found')
	}

	const drink: DrinkWithoutRecipes = {
		id: rawDrink.id,
		slug: rawDrink.slug,
		name: rawDrink.name,
		description: rawDrink.description,
		color: rawDrink.color
	}

	const images: string[] = []
	// const { images }: { images: string[] } = await timeFn('select images', () =>
	// 	db
	// 		.select({
	// 			images: sql<string[]>`ARRAY_AGG(${servingImages.imageUrl})`
	// 		})
	// 		.from(servingImages)
	// 		.innerJoin(servings, eq(servingImages.servingId, servings.id))
	// 		.innerJoin(drinkRecipes, eq(servings.drinkRecipeId, drinkRecipes.id))
	// 		.innerJoin(drinks, eq(drinkRecipes.drinkId, drinks.id))
	// 		.where(eq(drinks.id, drink.id))
	// )

	const recipesPromise: Promise<DrinkRecipeWithoutIngredientsAndServings[]> = timeFnAsync(
		'select recipes',
		() => db.select().from(drinkRecipes).where(eq(drinkRecipes.drinkId, drink.id))
	)

	const drinkTheme = drink.color
		? timeFn('generate color theme', () => generateColorTheme(drink.color!))
		: null

	return {
		drink,
		drinkTheme,
		images,
		recipesPromise
	}
}
