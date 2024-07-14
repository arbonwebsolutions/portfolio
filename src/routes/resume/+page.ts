// import * as db from '$lib/server/database';
import moment from 'moment';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { supabase } = await parent();

	const { data: companies } = await supabase.from('companies').select('*,projects(*,skills(*))');
	companies.forEach((company) => {
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

	companies.sort((a, b) => {
		return a.start_date.unix() > b.start_date.unix() ? -1 : 1;
	});

	return {
		companies
	};
};
