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

					resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(getOne)) });
					return;
				}
				// get all invoices
				if (url.includes('allInvoices') && opts.method === 'GET') {
					resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(invoices)) });
					return;
				}

				//addInvoice
				if (url.endsWith('/invoices/addInvoice') && opts.method === 'POST') {
					// get new user object from post body
					let newInvoice = JSON.parse(opts.body);

					if (isEmpty(newInvoice)) {
						reject('invoices/addInvoice request is empty');
						return;
					}

					// validation
					let duplicateInvoice = invoices.filter((invoice) => {
						return invoice.name === newInvoice.name;
					}).length;
					if (duplicateInvoice) {
						reject('Invoice "' + newInvoice.name + '" is already taken');
						return;
					}
					// save new user
					newInvoice.id = invoices.length ? Math.max(...invoices.map((invoice) => invoice.id)) + 1 : 1;
					invoices.push(newInvoice);
					localStorage.setItem('invoices', JSON.stringify(invoices));
					// respond 200 OK
					console.log('receveid new data', invoices, newInvoice);
					resolve({ ok: true, text: () => Promise.resolve() });
					return;
				}

				//delete invoice
				if (url.includes('invoices/') && opts.method === 'DELETE') {
					//if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
					// find user by id in users array
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
					resolve({ ok: true, text: () => Promise.resolve() });

					return;
				}

				// authenticate
				// if (url.endsWith('/authenticate') && opts.method === 'POST') {
				//     // get parameters from post request
				//     let params = JSON.parse(opts.body);

				//     // find if any user matches login credentials
				//     let filteredUsers = users.filter(user => {
				//         return user.username === params.username && user.password === params.password;
				//     });

				//     if (filteredUsers.length) {
				//         // if login details are valid return user details and fake jwt token
				//         let user = filteredUsers[0];
				//         let responseJson = {
				//             id: user.id,
				//             username: user.username,
				//             firstName: user.firstName,
				//             lastName: user.lastName,
				//             token: 'fake-jwt-token'
				//         };
				//         resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
				//     } else {
				//         // else return error
				//         reject('Username or password is incorrect');
				//     }

				//     return;
				// }

				// // get user by id
				// if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
				//     // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
				//     if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
				//         // find user by id in users array
				//         let urlParts = url.split('/');
				//         let id = parseInt(urlParts[urlParts.length - 1]);
				//         let matchedUsers = users.filter(user => { return user.id === id; });
				//         let user = matchedUsers.length ? matchedUsers[0] : null;

				//         // respond 200 OK with user
				//         resolve({ ok: true, text: () => JSON.stringify(user)});
				//     } else {
				//         // return 401 not authorised if token is null or invalid
				//         reject('Unauthorised');
				//     }

				//     return;
				// }

				// pass through any requests not handled above
				realFetch(url, opts).then((response) => resolve(response));
			}, 500);
		});
	};
}
