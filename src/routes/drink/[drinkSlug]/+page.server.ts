import { redirect } from '@sveltejs/kit'

import { createLogger } from '$lib/createLogger.js'

export async function load({ locals, params, parent }) {
	const { log, timeFnAsync } = createLogger(`/drink/[drinkSlug] - +page.server`, locals.requestId)

	log('load')

	const { recipesPromise } = await timeFnAsync('await parent', () => parent())

	const recipes = await timeFnAsync('await recipes', () => recipesPromise)
	const firstRecipe = recipes[0]
	if (firstRecipe) {
		log('Redirecting to first recipe', { recipeId: firstRecipe.id })
		redirect(301, `/drink/${params.drinkSlug}/${firstRecipe.id}`)
	}

	log('No recipes found')
}
