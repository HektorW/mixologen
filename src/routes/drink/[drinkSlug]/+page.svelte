<script lang="ts">
	import Button, { ButtonVariant } from '$lib/components/buttons/Button.svelte'
	import Card, { CardVariant } from '$lib/components/layout/Card.svelte'
	import FloatingNavigation from '$lib/components/layout/FloatingNavigation.svelte'
	import InnerLayout from '$lib/components/layout/InnerLayout.svelte'

	let { data } = $props()
</script>

<InnerLayout>
	<Card variant={CardVariant.Outlined}>
		<p>Inga recept tillagda än.</p>
		<Button variant={ButtonVariant.Filled} href="/drink/{data.drink.slug}/add-recipe">
			Lägg till första receptet
		</Button>
	</Card>
</InnerLayout>

<!-- <FloatingNavigation>
	<Button variant={ButtonVariant.Outlined} href="/" iconStart="solar:alt-arrow-left-outline">
		Tillbaka
	</Button>

	<Button variant={ButtonVariant.Tonal} iconStart="mdi:add">Servering</Button>

	<Button
		variant={ButtonVariant.Filled}
		href="/drink/{data.drink.slug}/add-recipe"
		iconStart="mdi:add"
	>
		Recept
	</Button>
</FloatingNavigation> -->
