const state = {
	type: null,
	message: null
};

const actions = {
	success({ commit }, message) {
		commit('success', message);
	},
	error({ commit }, message) {
		commit('error', message);
	},
	clear({ commit }, message) {
		commit('success', message);
	}
};

const mutations = {
	success(state, message) {
		state.type = 'alert-success w-50 bg-primary';
		state.message = message;
		setTimeout(() => {
			state.type = null;
			state.message = null;
		}, 3000);
	},
	error(state, message) {
		state.type = 'alert-danger bg-danger w-50';
		state.message = message;
	},
	clear(state) {
		state.type = null;
		state.message = null;
	}
};

export const alert = {
	namespaced: true,
	state,
	actions,
	mutations
};
