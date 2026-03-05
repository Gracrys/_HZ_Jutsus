<script lang="ts">
import { onMount } from 'svelte';
import Modal from '$lib/components/modal.svelte';
import { sc, check, ls } from '$lib/stores/sc.store';

let { jutsus } = $props();



let keyState =$state('');
let currentJutsu: any = null;

onMount(() => {
	sc.on('game', (x: any) => {
		check.set(false);
		console.warn(x, 'suck');
		if (x?.message) alert(x.message.kanji);
	});
});

console.log(jutsus);

function game(e: KeyboardEvent) {
	const k = e.key;
	if (!$check) {
		if ((/Enter/i).test(k)) {
			currentJutsu = jutsus?.[keyState];
            console.log(ls)
			sc.emit('game', { ...$ls, jutsu: jutsus?.[keyState] });
			keyState = '';
		} else if ((/Backspace/i).test(k)) {
			keyState = keyState.slice(0, -1);
		} else if ((/[a-z]/ig).test(k)) {
			keyState += k;
		}
	}
}


</script>
<style lang="scss">

</style>

<svelte:body on:keydown={game} />

<main class="c-main">
	{#if !!currentJutsu}
		<figure class="js-symbol u-center">{currentJutsu?.symbol}</figure>
		<span class="js-symbol js-symbol_desc">
			<h1>{currentJutsu?.kanji}</h1>
			<h3>
				<blockquote>{currentJutsu?.romanji}</blockquote>
			</h3>
		</span>
	{/if}
</main>

<footer>
	<dialog id="logger" class="js-log c-log" class:is-logged={!!keyState}>{keyState}</dialog>
</footer>

{#if $check}
	<Modal />
{/if}