<script lang="ts">
	export let data;

	import SquareLogo from '$lib/components/SquareLogo.svelte';

	$: ({ project } = data);
</script>

<div>
	<div>Company Name</div>
	<div>Job Title</div>
	<SquareLogo src={project.logo_base64} />
	<div>{project.name}</div>
	<div>Video</div>
	<div>Photo</div>
	<div></div>
</div>
