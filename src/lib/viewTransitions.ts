import type { Drink } from './types'

export function viewTransitionDrinkName(drink: Pick<Drink, 'slug'>) {
	return { style: `view-transition-name: drink-${drink.slug}` } as const
}
