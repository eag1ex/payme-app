## PAYME Application
#### - [ Developed by Eaglex ](http://eaglex.net)

#### Overview
* A Vue.js MVC invoicing application, enables you to create/delete/view invoices with properties: `name, value, email, date(static)` . You can view list database and individual item routes. There are 4 page routes: `/home, /list,/item/{id},/create`. Application has been documented.

#### Stack
* ES6, MVC, Vue.js v2 with Vuex, Vue-materials, Lodash, Webpack,  Bootstrap 4, Mock-backend.

#### RESt/API
* You can use the mock-fake-backend to simulate real API calls.

#### Hierarchy 
* Application structure
**vue module components:**  `/app /create /404 /list /item/{id}`
**services:**  `/libs/_services/invoice.service.js`
**vue  store module:**  `/libs/_store/invoice.module.js`
**mock data:**  `/libs/mock-data` < *initial invoice data for api/fake-backend.js*
**fake-backend api:**  `/libs/fake-backend.js`
**/\/index.js:**  `every libs service/module has index.js for export`
**main ./index.js:** `root of application where all modules and plugins are imported in to. `
**./libs/router.js:**  `all components are imported to this file`
**./libs/styles**  `all style/css plugins are maintained here and exported via index.js, except for some of independant styles of components.`

#### Webpack
* There are 3 files common, development and production.
````
externals: {
// this is injected into the application dynamicly, and api/base can be changed per build environment.
// global app config object
	config:  JSON.stringify({
	apiUrl:  API_BASE()
	})
},
````

####  Start/install application
```
$/ npm install
$/ npm start # will run dev server and open browser
$/ npm run build # will optimize all files for production
# you may need to install/ rebuild node-sass, 
# if problems refer to "engines": { < in package.json or remove it and try again.
```
##### Requirements
````
$/ npm install webpack -g
$/ npm install -g vue-cli # not too sure if required
````

	

####  Bugs
* There is 1 bug in the early vue-materials plugin (still in beta), on /list route, when selecting and deleting you have to re-select again.


#### Thank you