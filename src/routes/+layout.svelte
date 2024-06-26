<script>
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
	<div class="bg-base-100 justify-between fixed top-0 left-0 right-0 h-16">
		<div class="navbar max-w-3xl mx-auto justify-between">
			<div>
				<a href="/" class="btn btn-ghost text-xl">Tyler Arbon</a>
				{#if session !== null}
					<a href="/user" class="btn btn-ghost">Profile</a>
				{/if}
				<a href="/resume" class="btn btn-ghost">Resume</a>
			</div>
			<div>
				{#if session == null}
					<button on:click={() => goto('/login')} class="btn btn-ghost">Login</button>
				{:else}
					<span class="text-white">{session.user.email}</span>
					<button
						on:click={async () => {
							await supabase.auth.signOut();
						}}
						class="btn btn-ghost">Logout</button
					>
				{/if}
			</div>
		</div>
	</div>
</div>

<slot />
