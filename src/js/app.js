var basicModule= require("./modules/basicModule");
var ClassModule = require("./modules/classModule");

//Require the global module, provided externally
require("tweenmax");

basicModule.init();

var instance = new ClassModule();
instance.greeting();