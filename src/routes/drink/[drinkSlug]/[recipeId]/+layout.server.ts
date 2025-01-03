import { error } from '@sveltejs/kit'

import { createLogger } from '$lib/createLogger.js'
import { parseIdParam } from '$lib/params'

export async function load({ locals, parent, params }) {
	const { log, timeFnAsync } = createLogger(
		`/drink/[drinkSlug]/[recipeId] - +layout.server`,
		locals.requestId
	)

	log('load')

	const { recipesPromise } = await timeFnAsync('await parent', () => parent())

	const { recipeId } = params
	const recipesWithoutIngredientsAndServings = await timeFnAsync(
		'await recipes',
		() => recipesPromise
	)
	const bareRecipe = recipesWithoutIngredientsAndServings.find(
		(r) => r.id === parseIdParam(recipeId)
	)
	if (!bareRecipe) {
		error(404, { message: 'Recipe not found' })
	}

	return {
		recipe: bareRecipe
	}
}
