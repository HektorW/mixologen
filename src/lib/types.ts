export type Drink = {
	id: number
	slug: string
	name: string
	description?: string | null
	color?: string | null
	recipes: DrinkRecipe[]
}

export type DrinkWithSlug = Pick<Drink, 'id' | 'slug'>

export type DrinkWithoutRecipes = Omit<Drink, 'recipes'>

export type DrinkWithRecipeIds = DrinkWithoutRecipes & {
	recipeIds: DrinkRecipe['id'][]
}

export type DrinkWithRecipeWithoutServings = DrinkWithoutRecipes & {
	recipes: DrinkRecipeWithoutServings[]
}

export type DrinkRecipe = {
	id: number
	name?: string | null
	ingredientsAndAmounts: IngredientAndAmount[]
	servings: Serving[]
	instructions?: string[] | null
	notes?: string | null
	createdAt: Date
}

export type DrinkRecipeWithoutServings = Omit<DrinkRecipe, 'servings'>
export type DrinkRecipeWithoutIngredientsAndServings = Omit<
	DrinkRecipe,
	'ingredientsAndAmounts' | 'servings'
>

export type IngredientAndAmount = {
	ingredient: Ingredient
	amount: string
}

export type Ingredient = {
	id: number
	name: string
	icon?: string | null
	variants?: DrinkIngredientVariant[]
}

export type DrinkIngredientVariant = {
	id: number
	name: string
	imageUrl?: string
}

export type Serving = {
	id: number
	rating: number
	notes?: string | null
	images: ImageUrl[]
	ingredientVariants: DrinkIngredientVariant[]
	date: Date
}

export type ImageUrl = string

export type Theme = {
	light: { [camelCaseToken: string]: string }
}
