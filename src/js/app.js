var basicModule= require("./modules/basicModule");
var ClassModule = require("./modules/classModule");

//Require the global module, provided externally
require("tweenmax");

var instance = new ClassModule();
instance.greeting();