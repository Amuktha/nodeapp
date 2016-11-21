var expect    = require("chai").expect;
var helper = require('./unitTestHelper');

describe("app.js unit testing", function() {
    
    it("get request builder test", function() {
        helper.requireUncached('../app.js');
    });

    xit("Hex to RGB conversion", function() {
    });
});