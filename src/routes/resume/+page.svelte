<script lang="ts">
	export let data;

	import { page } from '$app/stores';
	import moment from 'moment';
	import SquareLogo from '$lib/components/SquareLogo.svelte';
	import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';

	$: ({ supabase, session, companies } = data);

	const year = moment().format('yyyy');
</script>

<svelte:head>
	<title>Tyler Arbon's Resume {year}</title>
</svelte:head>

<div class="flex flex-col items-center py-12 px-4 min-h-screen text-xs md:text-sm lg:text-base">
	<div class="flex flex-col sm:max-w-3xl">
		<div class="flex flex-col gap-12">
			<AnimatedBackground />
			<div class="flex flex-row justify-between items-center gap-12">
				<div class="flex flex-col gap-2">
					<div class="text-3xl">Tyler Arbon</div>
					<div>
						Web Developer looking for a position at a prominent tech company where I can use my 12+
						years of professional development experience to improve the people that I work with, the
						infrastructure that is established, and the company as a whole.
					</div>
				</div>
				<div class="">
					<img
						class="min-w-[256px] max-w-[256px] rounded-lg"
						alt="Profile"
						src="https://gravatar.com/avatar/50d206498a891942841315d05c48c584?size=256&cache=1720990986713"
					/>
				</div>
			</div>
			{#each companies as company}
				<div class="flex flex-col gap-2">
					<div class="flex flex-col">
						<div class="uppercase">
							{company.name}
						</div>
						<div class="text-xs text-primary ml-0">
							{company.job_title}
						</div>
					</div>
					<div class="flex flex-col gap-4">
						{#each company.projects as project}
							<div class="flex flex-row gap-2">
								<SquareLogo src={project.logo_base64} />
								<div class="flex flex-col gap-3 grow">
									<div class="flex flex-row justify-between">
										<div class=" grow">
											<div class="uppercase font-bold">
												{project.name}
												{#if project.website}
													<span class="lowercase ml-2">
														(<a href={project.website} target="_blank" class="link link-primary"
															>Website</a
														>)
													</span>
												{/if}
											</div>
											<div>
												{project.start_date.format('MMMM YYYY')} - {project.end_date.format(
													'MMMM YYYY'
												)}
											</div>
										</div>
										<div>
											<a class="btn btn-primary btn-sm" href="resume/{project.id}">View</a>
										</div>
									</div>
									{#if project.skills.length > 0}
										<div class="flex flex-row flex-wrap text-xs lowercase gap-1">
											{#each project.skills as skill}
												<div class="badge badge-accent font-thin">{skill.name}</div>
											{/each}
										</div>
									{/if}

									<div class="whitespace-pre-wrap">{project.description}</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
