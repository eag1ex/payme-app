import Vue from 'vue';

/// extentions
import VeeValidate from 'vee-validate';
//import BootstrapVue from 'bootstrap-vue';
import VueMaterial from 'vue-material';
//import { /*MdButton, MdContent, MdTabs*/ MdTable } from 'vue-material/src/components';
// end
import './libs/styles/index.scss';
import { store } from './libs/_store';
import { router } from './libs';
import App from './app/App';

Vue.use(VeeValidate);
//Vue.use(BootstrapVue);
Vue.use(VueMaterial); //Vue.use(MdContent);Vue.use(MdTabs);
// setup fake backend
import { configureFakeBackend } from './libs';
configureFakeBackend();

new Vue({
	el: '#app',
	router,
	store,

	// beforeUpdate: function() {
	// 	//console.log('beforeUpdate');
	// },
	// beforeCreate: function() {
	// 	//	this.$router.push('/item/5');
	// },
	// beforeMount: function() {
	// 	//console.log('beforeMount');
	// },
	render: (h) => h(App),
	renderError(h, err) {
		return h('pre', { style: { color: 'red' } }, err.stack);
	}
});
