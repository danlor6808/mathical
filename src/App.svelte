<script>
	// imports
	import Config from './Config.svelte';
	import Control from './Control.svelte';
	
	// State
	let problems = [];
	let difficulty;

	// Methods
	let updateConfig = (data) => {
		problems = data.detail.problems;
		difficulty = data.detail.difficulty;
	}
</script>

<main>
	<h1>Mathical</h1>
	{#if !problems.length}
		<Config difficulty={difficulty} on:updateConfig={updateConfig} />
	{:else}
		<Control problems={problems} difficulty={difficulty} on:updateConfig={updateConfig} />
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