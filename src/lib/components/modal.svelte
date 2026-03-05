<script lang="typescript">
	import { ls, sc } from '$lib/stores/sc.store';
	import { slide } from 'svelte/transition';

	let data = $state({
		room: '',
		name: ''
	});

	sc.on('log', (event) => {
		console.log('response:', event);
	});

	function sendData() {
        console.log('sending data:', data);
		sc.emit('log', data);
		localStorage.setItem('data', JSON.stringify(data));
		ls.set(data);
	}




</script>

<style lang="scss">
	#modal {
		position: absolute;

		&.js-active {
			animation: slide 2s 1;
			bottom: 40vh;
		}

		input[type='text'] {
			background-image: linear-gradient(to bottom, #ffffff44 0%, #ffffff88 100%);
		}
	}

	@keyframes slide {
		from {
			bottom: -400px;
		}
		to {
			bottom: 40vh;
		}
	}

	label {
		display: block;
	}
</style>

	<dialog id="modal" transition:slide={{ delay: 250, duration: 2200 }} class="js-modal c-modal js-active">
		<h1>hENLO!</h1>
		{#if !$ls?.name}
			<span class="c-label">Pick a name</span>
			<input type="text" bind:value={data.name} />
		{/if}
		<p>Select a server</p>
		<input type="text" bind:value={data.room} />
		<button on:click={sendData}>accept</button>
	</dialog>


