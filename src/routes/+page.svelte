<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	if (browser) {
		goto('/resume');
	} else {
		redirect(307, '/resume');
	}
</script>

<div class="hero min-h-screen bg-base-300">
	<!-- <div class="hero-content">
		<div class="max-w-md text-center">
			<h1 class=" dark:text-white font-bold text-4xl">Welcome</h1>
			<p class="py-6">Create an account</p>
			<a href="/login" class="btn btn-primary">Create an Account</a>
		</div>
	</div> -->
</div>
