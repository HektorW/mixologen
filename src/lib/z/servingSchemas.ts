import { z } from 'zod'

export const maxImageFileSize = 5000000
export const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png']

export const addServingSchema = z.object({
	drinkId: z.number(),
	recipeId: z.number(),

	date: z.date().optional(),

	rating: z.number().min(1).max(10),
	ingredientVariants: z
		.object({
			ingredientId: z.number(),
			variantName: z.string().optional()
		})
		.array(),

	images: z
		.instanceof(File)
		.refine((file) => acceptedImageTypes.includes(file.type), {
			message: 'Only .jpg, .jpeg and .png files are accepted.'
		})
		.refine((file) => file.size <= maxImageFileSize, {
			message: `Image must be less than ${maxImageFileSize / 1000000}MB`
		})
		.array(),
	notes: z.string().optional()
})
