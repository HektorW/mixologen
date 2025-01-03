import type { DrinkRecipe, IngredientAndAmount, Serving } from '$lib/types'

import { eq } from 'drizzle-orm'

import { db } from '../db'
import {
	drinkRecipeIngredients,
	drinkRecipes,
	ingredients,
	ingredientVariants,
	servings
} from '../schema'

export async function selectFullNestedRecipesForDrinkId(drinkId: number): Promise<DrinkRecipe[]> {
	const rawRecipes = await db.select().from(drinkRecipes).where(eq(drinkRecipes.drinkId, drinkId))

	return Promise.all(
		rawRecipes.map<Promise<DrinkRecipe>>(async (recipe) => {
			const [ingredientAndAmounts, servings] = await Promise.all([
				selectIngredientAndAmountsForRecipeId(recipe.id),
				selectServingsForRecipeId(recipe.id)
			])

			return {
				id: recipe.id,
				name: recipe.name,
				notes: recipe.notes,
				instructions: recipe.instructions,
				createdAt: recipe.createdAt,
				ingredientsAndAmounts: ingredientAndAmounts,
				servings
			}
		})
	)
}

export async function selectIngredientAndAmountsForRecipeId(
	recipeId: number
): Promise<IngredientAndAmount[]> {
	const rawIngredientsAndAmounts = await db
		.select({
			id: ingredients.id,
			name: ingredients.name,
			icon: ingredients.icon,
			amount: drinkRecipeIngredients.amount
		})
		.from(drinkRecipeIngredients)
		.innerJoin(ingredients, eq(drinkRecipeIngredients.ingredientId, ingredients.id))
		.where(eq(drinkRecipeIngredients.drinkRecipeId, recipeId))

	return rawIngredientsAndAmounts.map((rawIngredientAndAmount) => {
		const ingredientAndAmount: IngredientAndAmount = {
			ingredient: {
				id: rawIngredientAndAmount.id,
				name: rawIngredientAndAmount.name,
				icon: rawIngredientAndAmount.icon
			},
			amount: rawIngredientAndAmount.amount
		}

		return ingredientAndAmount
	})
}

export async function selectServingsForRecipeId(recipeId: number): Promise<Serving[]> {
	return []
	// const rawServings = await db
	// 	.select()
	// 	.from(servings)
	// 	.innerJoin(servingIngredientVariants)
	// 	.where(eq(servings.drinkRecipeId, recipeId))

	// // return []

	// return Promise.all(
	// 	rawServings.map<Serving>(async (serving) => {
	// 		const rawImages = await db

	// 		return {
	// 			id: serving.id,
	// 			date: serving.date,
	// 			rating: serving.rating,
	// 			notes: serving.notes,
	// 			ingredientVariants: [],
	// 			images: []
	// 		}
	// 	})
	// )
}
