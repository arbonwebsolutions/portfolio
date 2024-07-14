import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { supabase } = await parent();

	const { data: project } = await supabase
		.from('projects')
		.select('*')
		.eq('id', params.project_id)
		.limit(1)
		.single();

	console.log(project);

	return {
		project
	};
};
