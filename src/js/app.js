var basicModule= require("./examples/basicModule");
var ClassModule = require("./examples/classModule");

//Require the global module, provided externally
require("tweenmax");

basicModule.init();

var instance = new ClassModule();
instance.greeting();

console.log(require("../views/data/data.json"));
