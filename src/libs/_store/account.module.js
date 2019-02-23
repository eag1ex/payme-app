import { userService, invoiceService } from '../_services';
import { router } from '../index';

const invoice = JSON.parse(localStorage.getItem('invoice'));
const state = invoice ? { status: { loggedIn: true }, invoice } : { status: {}, user: null };

const actions = {
	// login({ dispatch, commit }, { username, password }) {
	// 	commit('loginRequest', { username });

	// 	userService.login(username, password).then(
	// 		(user) => {
	// 			commit('loginSuccess', user);
	// 			router.push('/');
	// 		},
	// 		(error) => {
	// 			commit('loginFailure', error);
	// 			dispatch('alert/error', error, { root: true });
	// 		}
	// 	);
	// },
	// logout({ commit }) {
	// 	userService.logout();
	// 	commit('logout');
	// },
	addInvoice({ dispatch, commit }, invoice) {
		commit('addInvoiceRequest', invoice);

		invoiceService.addInvoice(invoice).then(
			(invoice) => {
				commit('addInvoiceSuccess', invoice);
				//router.push('/login');
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
	// loginRequest(state, user) {
	// 	state.status = { loggingIn: true };
	// 	state.user = user;
	// },
	// loginSuccess(state, user) {
	// 	state.status = { loggedIn: true };
	// 	state.user = user;
	// },
	// loginFailure(state) {
	// 	state.status = {};
	// 	state.user = null;
	// },
	// logout(state) {
	// 	state.status = {};
	// 	state.user = null;
	// },
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

export const account = {
	namespaced: true,
	state,
	actions,
	mutations
};
