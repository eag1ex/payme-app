/**
 * share functions for reuse
 */

import * as moment from 'moment';

function niceDate(date = 0) {
	return moment(date).format('DD-MM-YY, h:mm:ss a');
}

export const filters = {
	niceDate
};


