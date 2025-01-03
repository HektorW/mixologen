import { json } from '@sveltejs/kit'

import { generateColorTheme } from '$lib/server/generateColorTheme.js'

export async function GET({ params }) {
	return json(generateColorTheme(`#${params.sourceColor}`))
}
