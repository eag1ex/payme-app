import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage';
import LoginPage from '../login/LoginPage';
import RegisterPage from '../register/RegisterPage';
import CreatePage from '../create/CreatePage';
Vue.use(Router);

export const router = new Router({
	mode: 'history',
	routes: [
		{ path: '/', component: HomePage },
		{ path: '/login', component: LoginPage },
		{ path: '/register', component: RegisterPage },
		{ path: '/edit', component: CreatePage },
		// otherwise redirect to home
		{ path: '*', redirect: '/' }
	]
});

router.beforeEach((to, from, next) => {
	// NOTE disable auth
	// redirect to login page if not logged in and trying to access a restricted page
	//	const publicPages = [ '/login', '/register' ];
	//	const authRequired = !publicPages.includes(to.path);
	//	const loggedIn = localStorage.getItem('user');
	// if (authRequired && !loggedIn) {
	// 	return next('/login');
	// }

	next();
});
