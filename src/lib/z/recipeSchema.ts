import { z } from 'zod'

export const addRecipeSchema = z.object({
	drinkId: z.number(),
	name: z.string(),

	ingredientNames: z.array(z.string()),
	ingredientAmounts: z.array(z.string()),

	instructions: z.array(z.string()),

	notes: z.string().optional(),
	sourceUrl: z.string().optional()
})

export const editRecipeSchema = z.object({
	id: z.number().int(),
	name: z.string().optional(),

	ingredientNames: z.array(z.string()).optional(),
	ingredientAmounts: z.array(z.string()).optional(),

	instructions: z.array(z.string()).optional(),

	notes: z.string().optional(),
	sourceUrl: z.string().optional()
})
