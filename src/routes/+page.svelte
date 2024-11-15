<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	// import { Button } from "$lib/components/ui/button";
	//

	let init = '';
	let allNames: string[][] = [];
	let names: string[][] = [];

	//on mount, load in the file names.json
	onMount(async () => {
		try {
			const res = await fetch(base + '/names.json');
			const data = await res.json();
			allNames = data;
			allNames = allNames.map((name) => {
				let newName = name;
				newName[1] = name[1].replace(', VICE PROVOST FOR UNDERGRADUATE EDUCATION', '');
				newName[1] = name[1].replace('\n', ' | ');
				newName[1] = newName[1].toLowerCase();
				return name;
			});
		} catch (e) {
			console.error(e);
		}
	});

	$: {
		//Filter the names
		names = allNames;
		init = init.toUpperCase();

		//names = all names with first initial last initial
		names = allNames.filter((name) => {
			return init == name[2];
		});
	}
</script>

<div class="flex w-full flex-col items-center justify-center pt-4">
	<div class="mx-4 rounded-lg border-primary bg-white p-2">
		Not affiliated with marriagepact. Data may have errors. Listing all Stanford undergrads, not
		just signups.
	</div>
	<div class="mx-4 mt-2 rounded-lg border-primary bg-white p-2">
		Also try
		<a class="text-blue-500" href="https://sambhavg.github.io/coursecorrect">/coursecorrect</a>
		<a class="text-blue-500" href="https://sambhavg.github.io/dine">/dine</a>
	</div>
</div>
<div class="justify-top flex min-h-screen flex-col items-center text-2xl font-bold">
	<div class="m-2 mb-0 min-h-20">
		<input
			type="text"
			bind:value={init}
			placeholder="initials"
			class="w-80 rounded-md border-2 border-gray-300 p-2"
		/>
	</div>
	<div class="mb-1">{names.length} results</div>
	<div class="grid">
		{#if names.length}
			{#each names as name}
				<div
					class="m-5 flex max-w-96 flex-col items-center justify-start rounded-md border-2 bg-white text-center"
				>
					<div class="p-1">{name[0]}</div>
					<div class="red_col p-1 text-xl italic">{name[1]}</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="postcss">
	:root {
		background-color: #ff003d;
	}
	.red_col {
		color: #ff003d;
	}
</style>
