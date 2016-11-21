var testContext = {};

/**
 * Stubbing getVariable and setVariable which uses local in-memory context
 * @type {{getVariable: Function, setVariable: Function}}
 */
global.context = {
    getVariable: function (s) {
        return testContext[s];
    },
    setVariable: function (k, v) {
        testContext[k] = v;
    }
};

global.Request = function () {};

global.httpClient = {
    send: function (s) {}
    
};

/**
 * Helper method to set values in test context
 * @param args
 * @param returnVal
 */
function contextSet(args, returnVal) {
    testContext[args] = returnVal;
}

/**
 * Helper method to get item from test context
 * @param args
 * @returns {*}
 */
function contextGet(args) {
    return testContext[args];
}

/**
 * Resets context between test runs
 */
function contextReset() {
    testContext = {};
}

/**
 * node.js caches modules that is imported using 'require'
 * this utility function prevents caching between it() functions - don't forget that variables are global in our javascript file
 * @param module
 * @returns {*}
 */
function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

/**
 * load javascript files and add exported functions to the global namespace
 * @param dependentJsFiles
 */
function loadDependencies(dependentJsFiles) {
    dependentJsFiles.forEach(function (f) {
        try {
            var exp = requireUncached(f);
            Object.keys(exp).forEach(function (k) {
                global[k] = exp[k];
            });
        } catch (e) {
            console.error("Unable to load file: " + f + ", Error:" + e);
            errorThrown = true;
        }
    });
}

module.exports = {
    requireUncached: requireUncached,
    contextSet: contextSet,
    contextGet: contextGet,
    loadDependencies: loadDependencies,
    contextReset: contextReset
};