import Vue from 'vue';
import Router from 'vue-router';

// import LoginPage from '../login/LoginPage';
// import RegisterPage from '../register/RegisterPage';
import HomePage from '../home/HomePage';
import CreatePage from '../create/CreatePage';
import ListPage from '../list/ListPage';
import ListItemPage from '../list-item/ListItemPage';
import Page404 from '../404/404Page';

Vue.use(Router);
let routeSet = false;
export const router = new Router({
	mode: 'history',
	routes: [
		//	{ path: '/login', component: LoginPage },
		//	{ path: '/register', component: RegisterPage },
		{ path: '/', component: HomePage },
		{ path: '/create', component: CreatePage },
		{ path: '/list', component: ListPage },

		// {
		// 	path: '/item*',
		// 	redirect: (to, from) => {
		// 		console.log('redirecting..', to, from);
		// 		// the function receives the target route as the argument

		// 		return `/404`;
		// 	}
		// },
		// setup server for dynamic routes
		// https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
		{ path: '/item/:name', component: ListItemPage },
		{ path: '/404', component: Page404 },

		// otherwise redirect to home
		{ path: '/home', redirect: '/' },
		{ path: '*', redirect: '/404' }
	]
});

router.beforeEach((to, from, next) => {
	// NOTE disable auth
	// redirect to login page if not logged in and trying to access a restricted page
	// const publicPages = [ '/login', '/register' ];
	// const authRequired = !publicPages.includes(to.path);
	// const loggedIn = localStorage.getItem('user');
	// if (authRequired && !loggedIn) {
	// 	return next('/login');
	// }
	next();
});
