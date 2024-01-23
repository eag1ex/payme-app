/**
 * this is our main router which imports each out our page components
 */

import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage';
import CreatePage from '../create/CreatePage';
import ListPage from '../list/ListPage';
import ListItemPage from '../list-item/ListItemPage';
import Page404 from '../404/404Page';

// test
Vue.use(Router);
export const router = new Router({
	...(process.env.publicPath ? { base: process.env.publicPath } : {}),
	mode: 'history',
	routes: [
		{ path: '/', component: HomePage },
		{ path: '/create', component: CreatePage },
		{ path: '/list', component: ListPage },
		{ path: '/item/:name', component: ListItemPage },
		{ path: '/404', component: Page404 },

		// otherwise redirect to home
		{ path: '/home', redirect: '/' },
		{ path: '*', redirect: '/404' }
	]
});

// set authentication, logic before each route
router.beforeEach((to, from, next) => {
	next();
});
