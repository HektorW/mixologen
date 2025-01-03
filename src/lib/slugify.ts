export function slugify(str: string) {
	return str
		.trim()
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/åä/g, 'a')
		.replace(/ö/g, 'o')
		.replace(/[^a-z0-9-]/g, '')
}
