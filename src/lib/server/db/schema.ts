import {
	boolean,
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core'

export const drinks = pgTable('drinks', {
	id: serial('id').primaryKey(),
	slug: varchar('slug', { length: 255 }).unique().notNull(),
	name: varchar('name', { length: 255 }).unique().notNull(),
	description: text('description'),
	color: varchar('color', { length: 255 }),
	createdAt: timestamp('created_at').defaultNow()
})

export const drinkRecipes = pgTable('drink_recipes', {
	id: serial('id').primaryKey(),
	drinkId: integer('drink_id')
		.notNull()
		.references(() => drinks.id),
	name: varchar('name', { length: 255 }).notNull(),
	sourceUrl: varchar('source_url', { length: 255 }),
	instructions: text('instructions').array(),
	notes: text('notes'),
	createdAt: timestamp('created_at').defaultNow().notNull()
})

export const ingredients = pgTable('ingredients', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).unique().notNull(),
	icon: varchar('icon', { length: 255 }),
	hasVariants: boolean('has_variants').notNull().default(true)
})

export const drinkRecipeIngredients = pgTable('drink_recipe_ingredients', {
	id: serial('id').primaryKey(),
	drinkRecipeId: integer('drink_recipe_id')
		.notNull()
		.references(() => drinkRecipes.id),
	ingredientId: integer('ingredient_id')
		.notNull()
		.references(() => ingredients.id),
	amount: varchar('amount', { length: 255 }).notNull()
})

export const servings = pgTable('servings', {
	id: serial('id').primaryKey(),
	drinkRecipeId: integer('drink_recipe_id')
		.notNull()
		.references(() => drinkRecipes.id),
	rating: integer('rating').notNull().default(0),
	notes: text('notes'),
	date: timestamp('date').defaultNow()
})

export const servingImages = pgTable('serving_images', {
	id: serial('id').primaryKey(),
	servingId: integer('serving_id')
		.notNull()
		.references(() => servings.id),
	imageUrl: varchar('image_url', { length: 255 }).notNull(),
	height: integer('height').notNull(),
	width: integer('width').notNull()
})

export const ingredientVariants = pgTable('ingredient_variants', {
	id: serial('id').primaryKey(),
	ingredientId: integer('ingredient_id')
		.notNull()
		.references(() => ingredients.id),
	name: varchar('name', { length: 255 }).unique().notNull(),
	imageUrl: varchar('image_url', { length: 255 })
})

export const servingIngredientVariants = pgTable(
	'serving_ingredient_variants',
	{
		servingId: integer('serving_id')
			.notNull()
			.references(() => servings.id),
		ingredientVariantId: integer('ingredient_variant_id')
			.notNull()
			.references(() => ingredientVariants.id)
	},
	(table) => ({
		pk: primaryKey({ columns: [table.servingId, table.ingredientVariantId] })
	})
)
