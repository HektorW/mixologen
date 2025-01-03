<script lang="ts">
	import Card, { CardEmphasis } from '../layout/Card.svelte'

	type FormErrorsProps = {
		errors: {
			path: string
			messages: string[]
		}[]
	}

	let { errors }: FormErrorsProps = $props()
</script>

<Card emphasis={CardEmphasis.Error}>
	<h2>Något gick fel</h2>

	{#each errors as error}
		<p>{error.path}</p>
		<ul>
			{#each error.messages as message}
				<li>{message}</li>
			{/each}
		</ul>
	{/each}
</Card>
