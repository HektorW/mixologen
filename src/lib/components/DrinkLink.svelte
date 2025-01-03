<script lang="ts">
	import { drinks } from '$lib/server/db/schema';

	type DrinkProps = {
		drink: typeof drinks;
	};

	let { drink }: DrinkProps = $props();
</script>
