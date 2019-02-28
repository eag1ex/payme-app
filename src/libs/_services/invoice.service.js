/**
 * {invoiceService}
 * Here we declare all our our RESt/Api calls
 * We use `config` a dynamic variable generated from webpack, `{config.apiUrl}` holds our base api
 *  
 */

import config from 'config';
import { isEmpty } from 'lodash';
import { isNumber } from 'util';

function addInvoice(invoice) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(invoice)
	};
	return fetch(`${config.apiUrl}/invoices/add`, requestOptions).then(handleResponse);
}

function getAll() {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch(`${config.apiUrl}/allInvoices`, requestOptions).then(handleResponse);
}

function getOneItem(id) {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch(`${config.apiUrl}/invoice/${id}`, requestOptions).then(handleResponse);
}

function _delete(ids) {
	const _ids = encodeURIComponent(ids.toString());
	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	};
	if (isEmpty(_ids)) throw `[_delete] ids are empty`;
	return fetch(`${config.apiUrl}/invoices/${_ids}`, requestOptions).then(handleResponse);
}

function handleResponse(data) {
	return data
		.json()
		.then(
			(d) => {
				if (d.msg) {
					if (d.msg.indexOf('No token provided') !== -1) {
						window.alert('session expired, please login in again.. ./login');
					}
				}
				console.log(`-- handleResponse`);
				console.log(`--`, JSON.stringify(d, false, 1));
				console.log(`-- END`);
				const resp = d.response;
				if (!d.success) {
					if (d.status === 401) {
						//	window.alert('response.status 401');
						window.location.reload(true);
					}
					const error = (d && d.message) || d.statusText;
					return Promise.reject(error);
				}
				return resp;
			},
			(err) => {
				return Promise.reject(err);
			}
		)
		.catch((err) => {
			//window.alert(err);
			console.log('handleResponse error->', err);
			return Promise.reject(err);
		});
}

export const invoiceService = {
	addInvoice,
	getAll,
	getOneItem,
	delete: _delete
	// getById,
	// update,
};

// function removeInvoice() {
// 	localStorage.removeItem('invoices');
// }

// function getById(id) {
// 	const requestOptions = {
// 		method: 'GET',
// 		headers: { 'Content-Type': 'application/json' }
// 	};
// 	return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

// function update(invoice) {
// 	const requestOptions = {
// 		method: 'PUT',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(invoice)
// 	};
// 	return fetch(`${config.apiUrl}/invoices/${invoice.id}`, requestOptions).then(handleResponse);
// }
