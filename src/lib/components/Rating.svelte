<script lang="ts">
	type RatingProps = {
		value: number
		maxValue?: number
	}

	let { value, maxValue = 10 }: RatingProps = $props()
</script>

<p>
	<span class="rating">{value}</span>/<span class="max-rating">{maxValue}</span>
</p>

<style>
	.rating,
	.max-rating {
		font-family: var(--font-family-heading);
		padding-inline: 0.2rem;
	}

	.rating {
		font-size: 2rem;
	}

	.max-rating {
		font-size: 1rem;
	}
</style>
