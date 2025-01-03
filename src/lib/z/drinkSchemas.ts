import { z } from 'zod'

export const addDrinkSchema = z.object({
	name: z.string().max(255),
	slug: z.string().max(255),
	description: z.string().optional(),
	color: z.string().optional()
})

export const editDrinkSchema = z.object({
	id: z.number().int(),
	name: z.string().max(255).optional(),
	slug: z.string().max(255).optional(),
	description: z.string().optional(),
	color: z.string().optional()
})
