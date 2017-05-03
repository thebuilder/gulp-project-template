gulp-project-template [![Codeship Status for thebuilder/gulp-project-template](https://codeship.io/projects/58d76280-fded-0131-f546-4ebc8a94177b/status?branch=master)](https://codeship.io/projects/29482)
=====================

[![Greenkeeper badge](https://badges.greenkeeper.io/thebuilder/gulp-project-template.svg)](https://greenkeeper.io/)
A template combining Gulp, Browserify, LiveReload and Jade, for a sweet starting point for new Angular projects.


##Getting started
The following tools are required when developing the project locally:

* [Node.js](http://nodejs.org/ "Node")  
  Make sure node is installed and paths are configured, so you can use **npm** from the terminal.
  
* [Gulp](https://github.com/gulpjs/gulp "Gulp")  
  Make sure Gulp is installed globally.

		npm install -g gulp

* [Bower](http://bower.io/ "Bower")
  Make sure Bower is installed globally.

		npm install -g bower
		
* ~~[LiveReload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)~~   LiveReload gets injected into the HTML when compiling development builds. This enables LiveReload in all browsers and   devices, not just Chrome.

Install the project node modules.   
		
	npm install

Install the bower components.

	bower install

To start developing run **gulp**. This will compile files, start a webserver and watch for changes. Any file changes will cause LiveReload to trigger an update of the html page.

    gulp


##Webstorm setup
If you are using Webstorm, you should make sure that it is configured for the project. This includes setting up JS libraries, scope and directories.


###Directories
You should mark the following directories inside Webstorm:

#####Excluded 
* **node_modules**
* **test/reports/coverage/{BROWSER}/js** _Exclude the coverage JS directory. Otherwise you will get duplicate .html files (detailing coverage) everything you are looking up a .js file._

#####Resource Root 
* **src** _Ensures correct relative paths in source files._
* **src/less** _You will need this to get correct relative image paths in .css_

#####Tests 
* **test**


###JS Libraries
	
	Preferences > Javascript > Libraries

To get proper code completion, you need to spend 10 minutes configuring the libraries you are using.


####Project libraries
You can mark files and directories in the project as libraries. This allows you to assign a scope for where they should be used, and helps with Webstorm code completion.

* **bower_components**
* **node_modules**

You can mark specific files/directories inside **bower_components** as a library, to give you better control over what is exposed. However you should generally prefer the "Typescript Community Stubs" if the library exists there.

####Typescript Community Stubs
Most of the Third Party libraries have Typescript interfaces that can be used. These interfaces knows exactly how the code is structured, what methods expect and what they return.

To get these, you should choose **Download**, and change the dropdown to "Typescript Community Stubs". Find the relevant lib, and add it. You will want the following:

* **angularjs**
* **greensock**

For testing these frameworks are used:

* **angular-protractor**
* **jasmine**
* **selenium-webdriver**

###Scope
Once you have prepared the libraries the project needs, you should configure the Scope. This specifies what JS should be available to which source files. For example, you do not want access to **node_modules** in your src files, since you would get a ton of irrelevant code completion hints.

The following is a suggestion for the libraries mentioned above. If you add more libraries, make sure to consider how it should be scoped.

###Mark as plain text
A final *"trick"* is to mark compiled files as plain text. This stops Webstorm from indexing the js/css, so you won't see references to compiled files in code completion.

You should exclude the following:

* **dist/js/*.js**
* **dist/css/app.css**
* **test/bundle/*.js**


##Karma+Jasmine Testing
The project is configured to use Karma and Jasmine for testing.

A special browserify task is configured to compile all **\*.spec.js** files in the src directory. This allows you to use **require()** when testing, which could be useful for things like:

* Require specific **.js** files when testing, instead of retrieving them from the compiled **app.js**
* Include dummy **.json** files when parsing data.
* Include dummy **.html** or **.jade** files.

The compiled **test.bundle.js** file includes a source map, so it will log the original file position if an error occurs.



###Karma
Karma is the engine that loads the **.js** and executes the tests.

All the karma specific configuration is located in the **karma.conf.js** file in the project root. When running the karma gulp tasks you can override these options.

###Jasmine
Jasmine is the framework used to write the tests. It is explained and demonstrated on their own website: 
[Jasmine 2.0](http://jasmine.github.io/2.0/introduction.html) 

A simple test could look like: 

```javascript
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});
```

##Protractor
Protractor is an E2E testing framework built for AngularJS.

####Debugging with Element Explorer
You can start an interactive version of the element explorer, so you can test out the various Protractor commands. This will allow you to quickly see the result of various locators and commands.

Get a selenium server running at **localhost:4444**:

	node node_modules/gulp-protractor/node_modules/.bin/webdriver-manager update
	node node_modules/gulp-protractor/node_modules/.bin/webdriver-manager start

Start element explorer on the Node server **localhost:3000** (make sure it is running, by executing `gulp serve`):

	node node_modules/gulp-protractor/node_modules/protractor/bin/elementexplorer.js localhost:3000

This will load up the URL on WebDriver and put the terminal into a REPL loop.
You will see a > prompt. The `browser`, `element` and `protractor` variables will be available. Enter a command such as:

    > element(by.id('foobar')).getText()

or

    > browser.get('http://localhost:3000/subpage.html')

To get a list of functions you can call, try:

    > browser

Typing <tab> at a blank prompt will fill in a suggestion for finding
elements.

Use the `list` helper function to find elements by strategy:
  e.g., `list(by.binding(''))` gets all bindings.
  
See the complete [Protractor API](http://angular.github.io/protractor/#/api)


##Continues Integration
If setting up a CI server, like [codeship.io](http://codeship.io), use the following commands in a Node 0.10.x env:


```
# Install the modules
npm install --silent
npm install bower gulp -g --silent
bower install -f --silent

# Test commands
gulp release test
```
