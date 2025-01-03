import { argbFromHex, hexFromArgb, themeFromSourceColor } from '@material/material-color-utilities'

export function generateColorTheme(hexColor: string) {
	const theme = themeFromSourceColor(argbFromHex(hexColor))

	const lightRaw = {
		primary: theme.palettes.primary.tone(40),
		onPrimary: theme.palettes.primary.tone(100),
		primaryContainer: theme.palettes.primary.tone(90),
		onPrimaryContainer: theme.palettes.primary.tone(10),

		secondary: theme.palettes.secondary.tone(40),
		onSecondary: theme.palettes.secondary.tone(100),
		secondaryContainer: theme.palettes.secondary.tone(90),
		onSecondaryContainer: theme.palettes.secondary.tone(10),

		tertiary: theme.palettes.tertiary.tone(40),
		onTertiary: theme.palettes.tertiary.tone(100),
		tertiaryContainer: theme.palettes.tertiary.tone(90),
		onTertiaryContainer: theme.palettes.tertiary.tone(10),

		error: theme.palettes.error.tone(40),
		onError: theme.palettes.error.tone(100),
		errorContainer: theme.palettes.error.tone(90),
		onErrorContainer: theme.palettes.error.tone(10),

		background: theme.palettes.neutral.tone(99),
		onBackground: theme.palettes.neutral.tone(10),

		surface: theme.palettes.neutral.tone(98),
		onSurface: theme.palettes.neutral.tone(10),
		surfaceVariant: theme.palettes.neutralVariant.tone(90),
		onSurfaceVariant: theme.palettes.neutralVariant.tone(30),

		outline: theme.palettes.neutralVariant.tone(50),
		outlineVariant: theme.palettes.neutralVariant.tone(80),

		shadow: theme.palettes.neutral.tone(0),
		scrim: theme.palettes.neutral.tone(0),

		inverseSurface: theme.palettes.neutral.tone(20),
		inverseOnSurface: theme.palettes.neutral.tone(95),
		inversePrimary: theme.palettes.primary.tone(80),

		surfaceDim: theme.palettes.neutral.tone(87),
		surfaceBright: theme.palettes.neutral.tone(98),

		surfaceContainerHighest: theme.palettes.neutral.tone(90),
		surfaceContainerHigh: theme.palettes.neutral.tone(92),
		surfaceContainer: theme.palettes.neutral.tone(94),
		surfaceContainerLow: theme.palettes.neutral.tone(96),
		surfaceContainerLowest: theme.palettes.neutral.tone(100)
	}

	return {
		light: argbObjectToHex(lightRaw)
	}
}

function argbObjectToHex(argbObject: Record<string, number>) {
	return Object.fromEntries(
		Object.entries(argbObject).map(([key, value]) => {
			return [key, hexFromArgb(value)]
		})
	)
}

function rawToCssVars(raw: Record<string, number>) {
	return Object.fromEntries(
		Object.entries(raw).map(([key, value]) => {
			const token = camelCaseToDash(key)
			return [`--color-${token}`, hexFromArgb(value)]
		})
	)
}

function camelCaseToDash(str: string) {
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
