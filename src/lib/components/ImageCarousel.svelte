<script lang="ts">
	type ImageCarouselProps = {
		items: Array<{
			imageSrc: string
			title?: string
		}>
	}

	let { items }: ImageCarouselProps = $props()
</script>

<section class="carousel">
	<div class="scroller">
		{#each items as item}
			<figure class="item">
				<img src={item.imageSrc} alt="" />
				{#if item.title}
					<figcaption>{item.title}</figcaption>
				{/if}
			</figure>
		{/each}
	</div>
</section>

<style>
	.carousel {
		--item-size: 50%;

		--_gutters: var(--gutters, 1rem);
		--_item-max-size: var(--item-size, 50%);
		--_item-anim-inset-start: 50%;
		--_item-anim-inset-end: 10%;

		display: grid;
		/* prettier-ignore */
		grid-template-columns:
      [carousel-gutter] var(--_gutters)
      1fr
      [carousel-gutter] var(--_gutters);
		grid-template-rows: [scroller] 1fr;

		height: 200px;
		container-type: inline-size;
	}

	.scroller {
		grid-row: 1;
		grid-column: 1 / -1;

		display: flex;
		gap: 1rem;

		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-behavior: smooth;
		scroll-snap-type: x mandatory;
		scroll-snap-stop: always;

		scroll-padding-inline: var(--_gutters);
		padding-inline: var(--_gutters);

		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}

		&::after {
			content: '';
			flex: 0 0 auto;
			width: calc(100% - var(--_item-max-size) - var(--_gutters));
		}
	}

	.item {
		border-radius: var(--corner-extra-large);
		flex: 0 0 auto;
		overflow: hidden;
		margin: 0;
		width: var(--_item-max-size);
		/* scroll-snap-align: left; */

		animation-timeline: view(inline var(--_item-anim-inset-start) var(--_item-anim-inset-end));
		animation-name: item-animation;
		animation-fill-mode: both;
		animation-duration: 1ms; /* Firefox requires this to apply the animation */
		animation-timing-function: linear;

		position: relative;

		img {
			display: block;
			height: 100%;
			object-fit: cover;
			width: 100%;
		}

		figcaption {
			/* background-color: rgba(0, 0, 0, 0.5); */
			/* color: white; */
			/* font-size: 1.5rem; */
			/* padding: 0.5rem; */
			color: #fff;
			inset: auto auto 1em 1em;
			position: absolute;
		}
	}

	@keyframes item-animation {
		from {
			width: 10%;
		}
	}
</style>
