<script>
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});

	export let data;
	// import "../app.pcss"
	import { goto, invalidateAll } from '$app/navigation';
	import '../app.css';

	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { sineOut } from 'svelte/easing';

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	supabase.auth.onAuthStateChange(async (event, session) => {
		if (event === 'SIGNED_IN') {
			invalidateAll();
		}

		if (event === 'SIGNED_OUT') {
			await goto('/login');
			invalidateAll();
		}
	});
</script>

<div class="mb-16">
	<div
		class="bg-base-content text-base-100 justify-between fixed top-0 left-0 right-0 h-16 border-b text-xs md:text-sm lg:text-base px-4"
	>
		<div class="navbar max-w-3xl p-0 mx-auto justify-between font-semibold">
			<div class="flex flex-row gap-4">
				<!-- <a href="/" class=" inline-flex sm:hidden text-lg">AWS</a>
				<a href="/" class=" hidden sm:inline-flex text-lg">Arbon Web Solutions</a> -->
				<a href="/resume" class="text-sm">Resume</a>
				{#if session !== null}
					<a href="/user" class="">Profile</a>
				{/if}
				<!-- <a href="/resume" class="">Resume</a> -->
			</div>
			<div class="flex flex-row gap-4">
				{#if session == null}
					<!-- <button on:click={() => goto('/login')} class="">Login</button> -->
				{:else}
					<span class="">{session.user.email}</span>
					<button
						on:click={async () => {
							await supabase.auth.signOut();
						}}
						class="">Logout</button
					>
				{/if}
				<select data-choose-theme class="bg-base-100 text-base-content hidden">
					<option value="">DEFAULT</option>
					<option value="light">LIGHT</option>
					<option value="dark">DARK</option>
					<option value="cupcake">CUPCAKE</option>
					<option value="bumblebee">BUMBLEBEE</option>
					<option value="emerald">EMERALD</option>
					<option value="corporate">CORPORATE</option>
					<option value="synthwave">SYNTHWAVE</option>
					<option value="retro">RETRO</option>
					<option value="cyberpunk">CYBERPUNK</option>
					<option value="valentine">VALENTINE</option>
					<option value="halloween">HALLOWEEN</option>
					<option value="garden">GARDEN</option>
					<option value="forest">FOREST</option>
					<option value="aqua">AQUA</option>
					<option value="lofi">LOFI</option>
					<option value="pastel">PASTEL</option>
					<option value="fantasy">FANTASY</option>
					<option value="wireframe">WIREFRAME</option>
					<option value="black">BLACK</option>
					<option value="luxury">LUXURY</option>
					<option value="dracula">DRACULA</option>
					<option value="cmyk">CMYK</option>
					<option value="autumn">AUTUMN</option>
					<option value="business">BUSINESS</option>
					<option value="acid">ACID</option>
					<option value="lemonade">LEMONADE</option>
					<option value="night">NIGHT</option>
					<option value="coffee">COFFEE</option>
					<option value="winter">WINTER</option>
					<option value="dim">DIM</option>
					<option value="nord">NORD</option>
					<option value="sunset">SUNSET</option>
				</select>
			</div>
		</div>
	</div>
</div>

<slot />
