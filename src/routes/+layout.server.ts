import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = (event) => {
	const { url } = event;
	if (url.pathname == '/') {
		redirect(307, '/resume');
	}
	return {};
};
