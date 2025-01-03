import { redirect } from '@sveltejs/kit'
import { fail, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

import { db } from '$lib/server/db/db'
import { drinks } from '$lib/server/db/schema'
import { addDrinkSchema } from '$lib/z/drinkSchemas'

export async function load() {
	const form = await superValidate(zod(addDrinkSchema))

	return {
		form
	}
}

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(addDrinkSchema))

		if (!form.valid) {
			return fail(400, { form })
		}

		console.log('/drink/add - Creating new drink', { formData: form.data })

		const [drink] = await db
			.insert(drinks)
			.values({
				name: form.data.name.trim(),
				slug: form.data.slug.trim(),
				description: form.data.description?.trim(),
				color: form.data.color?.trim()
			})
			.returning()

		console.log('/drink/add - Drink created', { drink })

		console.log('/drink/add - Redirecting to new drink page', { slug: drink.slug })
		redirect(301, `/drink/${drink.slug}`)
	}
}
