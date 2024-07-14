<script lang="ts">
	export let src;
</script>

<div class="w-16 h-16 min-w-16">
	{#if src}
		<div
			class="flex w-16 h-16 shadow bg-white text-nuetral rounded-box align-middle items-center justify-center p-2 border"
		>
			<img {src} alt="logo" class="h-full" />
		</div>
	{/if}
</div>
