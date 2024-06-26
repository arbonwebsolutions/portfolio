<script lang="ts">
	export let data;

	import { page } from '$app/stores';
	import moment from 'moment';

	let companies = [];
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	page.subscribe(async () => {
		let { data, error } = await supabase.from('companies').select('*,projects(*,skills(*))');

		console.log({ data, error });

		data.forEach((company) => {
			company.projects.forEach((project) => {
				project.start_date = moment(project.start_date);
				project.end_date = project.end_date ? moment(project.end_date) : moment();

				company.start_date =
					!company.start_date || project.start_date.unix() < company.start_date.unix()
						? project.start_date
						: company.start_date;
				company.end_date =
					!company.end_date || project.end_date.unix() < company.end_date.unix()
						? project.end_date
						: company.end_date;
			});
		});

		data.sort((a, b) => {
			return a.start_date.unix() > b.start_date.unix() ? -1 : 1;
		});
		companies = [...data];
	});
</script>

<div class="flex flex-col items-center p-4 min-h-screen text-xs md:text-sm lg:text-base">
	<div class="flex flex-col sm:max-w-3xl">
		<div class="flex flex-col gap-12">
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
								<div class="w-16 h-16 min-w-16">
									{#if project.logo_base64}
										<div
											class="flex w-16 h-16 shadow bg-white text-nuetral rounded-box align-middle items-center justify-center p-2 border"
										>
											<img src={project.logo_base64} alt="logo" class="h-full" />
										</div>
									{/if}
								</div>
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
											<button class="btn btn-primary btn-sm">View</button>
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
