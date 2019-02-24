import { userService, invoiceService } from '../_services';
import { router } from '../index';

const invoices = JSON.parse(localStorage.getItem('invoices'));
const state = invoices ? { status: { loggedIn: true }, invoices } : { status: {}, invoices: null };

const actions = {
	getAll({ commit }) {
		commit('getAllRequest');
		invoiceService
			.getAll()
			.then((invoices) => commit('getAllSuccess', invoices), (error) => commit('getAllFailure', error));
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
	}
};

const mutations = {
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
	}
};

export const invoice = {
	namespaced: true,
	state,
	actions,
	mutations
};
