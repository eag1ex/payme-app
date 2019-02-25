/**
 * here we bootstrap the application and import everything, including scss
 */

import Vue from 'vue';
/// extentions
import VeeValidate from 'vee-validate';
import VueMaterial from 'vue-material';

import './libs/styles/index.scss';
import { store } from './libs/_store';
import { router } from './libs';
import App from './app/App';
import { configureFakeBackend } from './libs';

// partials
import Spinner from './libs/partials/progress-spinner';
import TopNav from './libs/partials/top-nav';
import TopTitle from './libs/partials/top-title';
import Footer from './libs/partials/footer';
Vue.component('spinner', Spinner);
Vue.component('top-nav', TopNav);
Vue.component('top-title', TopTitle);
Vue.component('footer-small', Footer);
// end

Vue.use(VeeValidate);
Vue.use(VueMaterial);

// setup fake backend
configureFakeBackend();

const _v = new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App),
	renderError(h, err) {
		return h('pre', { style: { color: 'red' } }, err.stack);
	}
});
