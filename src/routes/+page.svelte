<script lang="ts">
	import Button, { ButtonVariant } from '$lib/components/buttons/Button.svelte'
	import DrinkList from '$lib/components/DrinkList.svelte'
	import FloatingNavigation from '$lib/components/layout/FloatingNavigation.svelte'
	import InnerLayout from '$lib/components/layout/InnerLayout.svelte'

	let { data } = $props()
</script>

<InnerLayout>
	<!-- <h1>Mixologen</h1> -->

	{#if data.drinks.length === 0}
		<p>Inga drinkar tillagda än.</p>
		<Button variant={ButtonVariant.Filled} href="/drink/add">Lägg till första drinken</Button>
	{:else}
		<DrinkList drinks={data.drinks} />
	{/if}

	<Button variant={ButtonVariant.Filled} href="/drink/add">Lägg till ny drink</Button>
</InnerLayout>

<style>
	h1 {
		color: var(--color-primary);
		font-size: 2rem;
	}
</style>
