(function() {

"use strict";

//#region plugins/antitrack/index.js
const { scoped } = shelter.plugin;
try {
	window.__SENTRY__.hub.getClient().getOptions().enabled = false;
	Object.keys(console).forEach((x) => console[x] = console[x].__sentry_original__ ?? console[x]);
} catch {}
scoped.http.intercept("POST", /^\/science|^\/error-reporting-proxy/, () => {});

//#endregion
})();