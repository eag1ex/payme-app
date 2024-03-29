/**
 * {invoiceStoreModule}
 * This is the Vuex.Store module which imports our invoice/api serice so we can later.
 * 
 * // mutations
 * these are our commit/s you may call them notifications, uppon each action we can then
 * access this.$store.subscribe(...)
 * 
 * The module is declared in `/_store/index.js` for export
 */

import { invoiceService } from '../_services';
const invoices = JSON.parse(localStorage.getItem('invoices'));
const state = invoices ? { status: { loggedIn: true }, invoices } : { status: {}, invoices: null };

const actions = {
	getAll({ dispatch, commit }) {
		commit('getAllRequest');
		invoiceService.getAll().then(
			(invoices) => commit('getAllSuccess', invoices),
			(error) => {
				commit('getAllFailure', error);
				dispatch('alert/error', error, { root: true });
			}
		);
	},
	getOneItem({ dispatch, commit }, invoice) {
		commit('getOneItemRequest', invoice);
		invoiceService.getOneItem(invoice).then(
			(invoice) => commit('getOneItemSuccess', invoice),
			(error) => {
				commit('getOneItemFailure', error);
				dispatch('alert/error', error, { root: true });
			}
		);
	},
	addInvoice({ dispatch, commit }, invoice) {
		commit('addInvoiceRequest', invoice);
		invoiceService.addInvoice(invoice).then(
			(invoice) => {
				commit('addInvoiceSuccess', invoice);

				setTimeout(() => {
					// display success message after route change completes
					dispatch('alert/success', 'New Invoice Added', { root: true });
				});
			},
			(error) => {
				commit('addInvoiceFailure', error);
				dispatch('alert/error', error, { root: true });
			}
		);
	},
	delete({ commit }, id) {
		commit('deleteRequest', id);
		invoiceService
			.delete(id)
			.then(
				(/*invoice*/) => commit('deleteSuccess', id),
				(error) => commit('deleteSuccess', { id, error: error.toString() })
			);
	}
};

const mutations = {
	getOneItemRequest(state) {
		state.all = { loading: true };
	},
	getOneItemSuccess(state, invoice) {
		state.all = { invoice };
	},
	getOneItemFailure(state, error) {
		state.all = { error };
	},
	getAllRequest(state) {
		state.all = { loading: true };
	},
	getAllSuccess(state, invoices) {
		state.all = { invoices };
	},
	getAllFailure(state, error) {
		state.all = { error };
	},
	addInvoiceRequest(state /*, invoice*/) {
		state.status = { adding: true };
	},
	addInvoiceSuccess(state /*, invoice*/) {
		state.status = {};
	},
	addInvoiceFailure(state /*, error*/) {
		state.status = {};
	},

	deleteRequest(state, id) {
		// add 'deleting:true' property to invoice being deleted
		state.all.invoices = state.all.invoices.map(
			(invoice) => (invoice.id === id ? { ...invoice, deleting: true } : invoice)
		);
	},
	deleteSuccess(state, id) {
		// remove deleted invoice from state
		state.all.invoices = state.all.invoices.filter((invoice) => invoice.id !== id);
	},
	deleteFailure(state, { id, error }) {
		// remove 'deleting:true' property and add 'deleteError:[error]' property to invoice
		state.all.invoices = state.invoices.map((invoice) => {
			if (invoice.id === id) {
				// make copy of invoice without 'deleting:true' property
				const { deleting, ...invoiceCopy } = invoice;
				// return copy of invoice with 'deleteError:[error]' property
				return { ...invoiceCopy, deleteError: error };
			}
			return invoice;
		});
	}
};

export const invoice = {
	namespaced: true,
	state,
	actions,
	mutations
};
