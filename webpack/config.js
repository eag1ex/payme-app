/**
 * here you can update server base api
 */

// *********************************
const port = 4000;
const localServer = `http://localhost:${port}/local`;
const liveServer = `https://blooming-journey-82987.herokuapp.com/api`;
// const liveServer = `http://localhost:5000/api`;
const useServerInDev = 'REAL'; // LOCAL or REAL

// **********************************

/// do not change anything here!

const API_BASE = () => {
	if (process.env.NODE_ENV === 'development') {
		if (useServerInDev === 'REAL') return liveServer;
		if (useServerInDev === 'LOCAL') return localServer; /// local fake-backend server // or http://localhost:5000/api`
	} else {
		return liveServer; // live server api
	}
};
const SERVER = () => {
	if (API_BASE().includes('api')) return 'REAL_SERVER';
	if (API_BASE().includes('local')) return 'LOCAL_SERVER';
	else return 'REAL_SERVER';
};

if (useServerInDev === 'REAL') console.log(`--- YOU ARE USING REAL_SERVER: ${liveServer}`);
if (useServerInDev === 'LOCAL') console.log(`--- YOU ARE USING LOCAL_SERVER: ${localServer}`);

exports.API_BASE = API_BASE;
exports.SERVER = SERVER;
exports.PORT = port;
