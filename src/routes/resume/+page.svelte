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

<div class="flex flex-col items-center pt-16 min-h-screen bg-base-300">
	<div class="flex flex-col w-[800px]">
		<div class="flex flex-col">
			{#each companies as company}
				<div>
					<div class="uppercase text-2xl">
						{company.name}
						-
						{company.job_title}
					</div>
					{#each company.projects as project}
						<div class="ml-8 mt-4 mb-12">
							<div class="uppercase text-2xl">
								{project.name}
							</div>
							<div>
								{project.start_date.format('MMMM YYYY')} - {project.end_date.format('MMMM YYYY')}
							</div>
							<div class="flex flex-row">
								{#each project.skills as skill}
									<div class="uppercase mr-4 font-bold">{skill.name}</div>
								{/each}
							</div>

							<div class=" whitespace-pre-wrap">{project.description}</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
