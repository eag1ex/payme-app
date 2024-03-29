/**
 * exporting store to main root /index.js
 */

import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './alert.module';
import { invoice } from './invoice.module';

Vue.use(Vuex);
export const store = new Vuex.Store({
	modules: {
		alert,
		//account,
		invoice
	}
});
