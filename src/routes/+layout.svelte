<script lang="ts">
	import Icon from '@iconify/svelte'
	import { onNavigate } from '$app/navigation'

	import Button from '$lib/components/buttons/Button.svelte'

	import Theme from './Theme.svelte'

	let { children } = $props()

	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			return
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Theme>
	<div class="layout">
		<!-- <div class="top">
			<p class="typescale-headline-small" style:color="var(--color-primary)">Mixologen</p>

			<Button variant="Tonal">Lägg till ny drink</Button>
		</div>

		<div class="side-nav">
			<nav>
				<a href="/"><Icon icon="hugeicons:drink" /> Drinkar</a>
			</nav>
		</div> -->

		<div class="content">
			{@render children()}
		</div>
	</div>
</Theme>

<style>
	.layout {
		display: grid;
		min-height: 100svh;

		/* grid-template-columns: 10rem 1fr;
		grid-template-rows: 4rem 1fr;
		grid-template-areas:
			'top top'
			'side-nav content'; */
	}

	.top {
		align-items: center;
		background-color: var(--color-surface-container-highest);
		display: flex;
		justify-content: space-between;
		grid-area: top;
		padding: 1rem;
	}

	.side-nav {
		background-color: var(--color-surface-container-highest);
		grid-area: side-nav;
		position: sticky;
		top: 0;
	}

	.content {
		background-color: var(--color-surface);
		/* border-radius: var(--corner-extra-large); */
		/* border-radius: var(--corner-extra-large); */
		/* grid-area: content; */
		/* margin-inline-end: var(--spacing-32); */
		/* margin-block-end: var(--spacing-32); */
		overflow: hidden;
	}
</style>
