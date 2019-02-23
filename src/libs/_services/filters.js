import * as moment from 'moment';

function niceDate(date = 0) {
	return moment(date).format('DD-MM-YY, h:mm:ss a');
}
function getChildRoute(test) {
	let baseRoute = '';
	if (window.location.hash.indexOf(test)) baseRoute = test;
	const ch = window.location.hash.split('/') || [];
	if (ch.length) return `/${baseRoute}/${ch[ch.length - 1]}`;
	else return false;
}

export const filters = {
	niceDate,
	getChildRoute
};
