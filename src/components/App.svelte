<script>
	import Config from './Config.svelte';
	import Control from './Control.svelte';
	import { problems } from '../stores.js';
</script>

<main>
	<h1>Mathical</h1>
	{#if !$problems.length}
		<Config  />
	{:else}
		<Control />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 450px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		margin-bottom: 15px;
	}
</style>