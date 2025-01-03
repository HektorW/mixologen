<script lang="ts">
	type ImageGridProps = {
		images: string[]
	}

	let { images }: ImageGridProps = $props()
</script>

<section>
	{#each images as image}
		<img src={image} alt="" />
	{/each}
</section>

<style>
	section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		/* gap: 1rem; */
	}

	img {
		height: auto;
		object-fit: cover;
		width: 100%;
	}
</style>
