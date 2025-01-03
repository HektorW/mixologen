import { redirect, fail as svelteKitFail } from '@sveltejs/kit'
import { put } from '@vercel/blob'
import { v2 as cloudinary } from 'cloudinary'
import { fail as superformsFail, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

import { db } from '$lib/server/db/db'
import { getIsValidDrinkIdAndRecipeId } from '$lib/server/db/queries/validateIds'
import {
	ingredientVariants,
	servingImages,
	servingIngredientVariants,
	servings
} from '$lib/server/db/schema'
import { addServingSchema } from '$lib/z/servingSchemas'

export async function load() {
	const form = await superValidate(zod(addServingSchema))

	return {
		form
	}
}

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(addServingSchema))

		if (!form.valid) {
			return superformsFail(400, { form })
		}

		const { drinkId, recipeId } = form.data

		if (!(await getIsValidDrinkIdAndRecipeId({ drinkId, recipeId }))) {
			return svelteKitFail(400, { form: { errors: ['Invalid drink or recipe'] } })
		}

		const { date, rating, notes, images } = form.data

		// Upload images
		const imageUrls = await Promise.all(
			images.map(async (image) => {
				const { url } = await put(image.name, image, { access: 'public' })
				return url
			})
		)

		// Create serving in DB
		const [serving] = await db
			.insert(servings)
			.values({
				drinkRecipeId: recipeId,
				date,
				rating,
				notes
			})
			.returning()

		// Associate images with serving
		await db.insert(servingImages).values(
			imageUrls.map((imageUrl) => ({
				servingId: serving.id,
				imageUrl
			}))
		)

		// Create ingredient variants in DB
		const dbIngredientVariants = await db
			.insert(ingredientVariants)
			.values(
				form.data.ingredientVariants
					.filter(
						(
							ingredentVariant
						): ingredentVariant is Required<(typeof form.data.ingredientVariants)[number]> =>
							!!ingredentVariant.variantName
					)
					.map((ingredentVariant) => ({
						ingredientId: ingredentVariant.ingredientId,
						name: ingredentVariant.variantName
					}))
			)
			.onConflictDoNothing({
				target: ingredientVariants.name
			})
			.returning()

		// Associate ingredient variants with serving
		await db.insert(servingIngredientVariants).values(
			dbIngredientVariants.map((dbIngredientVariant) => ({
				servingId: serving.id,
				ingredientVariantId: dbIngredientVariant.id
			}))
		)

		redirect(301, `/drink/${drinkId}/${recipeId}`)
	}
}
