import config from 'config';

import { isArray } from 'lodash';

export const invoiceService = {
	addInvoice,
	getAll,
	getById,
	update,
	delete: _delete
};

function removeInvoice() {
	// remove user from local storage to log user out
	localStorage.removeItem('invoices');
}

function addInvoice(invoice) {
	if (!isArray(invoice)) throw `[addInvoice] is not an array`;
	const requestOptions = {
		method: 'GET'
	};
	return fetch(`${config.apiUrl}/invoices/addInvoice`, requestOptions).then(handleResponse);
}

function getAll() {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch(`${config.apiUrl}/invoices`, requestOptions).then(handleResponse);
}

function getById(id) {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(invoice) {
	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(invoice)
	};
	return fetch(`${config.apiUrl}/invoices/${invoice.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch(`${config.apiUrl}/invoices/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				//logout();
				window.alert('response.status 401');
				location.reload(true);
			}
			console.log('handleResponse', response);
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}
		console.log('handleResponse', response);
		return data;
	});
}
