import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
/// extentions
import VeeValidate from 'vee-validate';
import VueMaterial from 'vue-material';
//import BootstrapVue from 'bootstrap-vue';
//import { /*MdButton, MdContent, MdTabs*/ MdTable } from 'vue-material/src/components';

import './libs/styles/index.scss';
import { store } from './libs/_store';
import { router } from './libs';
import App from './app/App';
import { configureFakeBackend } from './libs';

/// partials
import Spinner from './libs/partials/progress-spinner';
Vue.component('spinner', Spinner);

Vue.use(VeeValidate);
//Vue.use(BootstrapVue);
Vue.use(VueMaterial); //Vue.use(MdContent);Vue.use(MdTabs);
// setup fake backend
configureFakeBackend();

//Vue.prototype.$appState = 'LOADING';

new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App),
	renderError(h, err) {
		return h('pre', { style: { color: 'red' } }, err.stack);
	}
});
