/**
 * // NOTE
 * {configureFakeBackend}
 * this is our fake server, so we can start production before backend is ready
 * 
 * AVAILABLE APIS:
 * {BASE}/allInvoices GET
 * {BASE}/invoice/{id} GET
 * {BASE}/invoices/addInvoice POST
 * {BASE}/invoices/{id} DELETE
 */
import { invoices } from './mock-data/invoices';
import { isEmpty } from 'lodash';

export function configureFakeBackend() {
	let realFetch = window.fetch;
	window.fetch = function(url, opts) {
		return new Promise((resolve, reject) => {
			// wrap in timeout to simulate server api call
			setTimeout(() => {
				console.log('calling url', url, opts.method);
				if (url.includes('invoice/') && !url.includes('allInvoices') && opts.method === 'GET') {
					let id = url.split('/');
					id = id[id.length - 1];
					if (id) id = Number(id);
					if (!id) return reject('no id found');

					const getOne = invoices.reduce((n, item, inx) => {
						if (item.id === id) n.push(item);
						return n;
					}, []);
					if (!getOne.length) return reject('no result found');
					const r = { response: getOne, success: true };
					return resolve({ json: () => Promise.resolve(r) });
				}
				// get all invoices
				if (url.includes('allInvoices') && opts.method === 'GET') {
					const r = { response: invoices, success: true };
					return resolve({ json: () => Promise.resolve(r) });
				}

				//addInvoice
				if (url.endsWith('/invoices/add') && opts.method === 'POST') {
					// get new user object from post body
					let newInvoice = JSON.parse(opts.body);
					if (isEmpty(newInvoice)) {
						return reject('invoices/add request is empty');
					}

					// validation
					let duplicateInvoice = invoices.filter((invoice) => {
						return invoice.name === newInvoice.name;
					}).length;
					if (duplicateInvoice) {
						return reject('Invoice "' + newInvoice.name + '" is already taken');
					}
					// save new user
					newInvoice.id = invoices.length ? Math.max(...invoices.map((invoice) => invoice.id)) + 1 : 1;
					invoices.push(newInvoice);
					localStorage.setItem('invoices', JSON.stringify(invoices));
					// respond 200 OK
					const r = { response: true, success: true };
					return resolve({ json: () => Promise.resolve(r) });
				}

				//delete invoice
				if (url.includes('invoices/') && opts.method === 'DELETE') {
					let urlParts = url.split('/');
					let ids = decodeURIComponent(urlParts[urlParts.length - 1]);
					let idsArr = ids.split(',');
					if (!idsArr.length) {
						return reject('no ids found');
					}

					for (let i = 0; i < invoices.length; i++) {
						idsArr.filter((id) => {
							const _id = Number(id);
							const found = _id === invoices[i].id;
							if (found) {
								console.log('removing ', invoices[i]);
								invoices.splice(i, 1);
								localStorage.setItem('invoices', JSON.stringify(invoices));
							}
							return true;
						});
					}
					// respond 200 OK
					const r = { response: true, success: true };
					return resolve({ json: () => Promise.resolve(r) });
				}
				// pass through any requests not handled above
				realFetch(url, opts).then((response) => resolve(response));
			}, 500);
		});
	};
}
