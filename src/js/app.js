var basicModule= require("./examples/basicModule");
var ClassModule = require("./examples/classModule");

//Require the global module, provided externally
require("tweenmax");

basicModule.init();

var instance = new ClassModule();
instance.greeting();

//You can also include external .json data.
var jsonData = require("../views/data/data.json");
console.log(jsonData.header);

//Example of requiring a Angular Controller by using require.
var angular = require("angular");
angular.module("gulpApp", [])
    .controller("exampleController", require("./examples/angularController"));