import type { Theme } from '$lib/types'

export const previewTheme = $state<{ value: Theme | null }>({
	value: null
})
