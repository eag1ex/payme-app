import Vue from 'vue';
import VeeValidate from 'vee-validate';

import './libs/styles/index.scss';
import { store } from './libs/_store';
import { router } from './libs';
import App from './app/App';

Vue.use(VeeValidate);

// setup fake backend
import { configureFakeBackend } from './libs';
configureFakeBackend();

new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App)
});
