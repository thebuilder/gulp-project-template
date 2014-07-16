gulp-project-template
=====================
A template combining Gulp, Browserify and Jade, for a sweet starting point for new projects.

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
		
* [LiveReload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)  
  Instantly see changes in HTML, JS, CSS etc.

Install the project node modules.   
		
	npm install

Install the bower components.

	bower install

To start developing run **gulp**. This will compile files, and watch for changes. Any file changes will cause LiveReload to trigger an update of the html page.

    gulp
    

##Gulp
The main **gulpfile.js** is kept very small, and only contains the very minimum require code and the alias tasks.
Everything else related to gulp is placed inside the **gulp/** directory.

* **tasks**
    * All the gulp tasks are placed in here.
* **util**
    * Utility methods.
* **.ftp.json**
    * FTP Servers used in the project. See [FTP task](#ftp) for details.
* **config.js**
    * Contains path variables and other configuration vars, that are shared by tasks. You can change these to suit your project.
* **index.js**
    * The file responsible for requiring all the tasks. You should not need to edit this.

###Alias Tasks
The following tasks are placed in **gulpfile.js**, and executes a group of tasks to compile the project.

####default
Start developing by calling build, watch, serve and open.

####build
Compiles the project

####release
Compile the project for release, minifying JS, etc.

####deploy
Compile a release build, zip it and upload to FTP.


###Tasks
Tasks placed in **gulp/tasks/** will be added to gulp, so you can run them. Feel free to delete unneeded tasks or add more. Just make sure to update the task groups to reflect any missing tasks.

####assets
Copy over assets to the build directory.

####bower
Concat bower components into .js and .css files.

####browserify
Compile JS using [browserify](http://browserify.org/).

####[ftp](id:ftp)
Upload the build directory to an ftp server.
You will need to manually create and fill out the blanks in **gulp/.ftp.json**.

This file contains a list of FTP server credentials in the following .json structure:

```
[{
    "id": "demo",
    "ftp": {
        "host": "",
        "port": 21,
        "user": "",
        "pass": "",
        "remotePath": ""
    }
}]
```

To push to a specific server you should run the ftp task with a target, like:

    gulp ftp --target demo

If no target is specified, or if there is only one target in the file, it will be used.

####images
Copy and minify images. Supports .png, .jpg, .gif and .svg.

####jade
Compile the main jade file.

####less
Compile the main less file, and attach source maps. The .less files are run through [RECESS](http://twitter.github.io/recess/) to ensure some sanity, and autoprefixes to add vendor tags. In release mode the css file will also be minified.

####lint
Run the .js files through JSHint, using the settings in **.jshintrc**. Change these to suit the project.

####karma
Tasks that start a Karma server up using the **karma.conf.js** configuration. Will also compile the code using browserify. It exposes the following tasks.


Single run test:

	test
	
To keep watching for changes:
	
	test-watch

####open
Opens the browser and navigate to the local server.

####serve
Create a local server. Default path is [http://localhost:8080]([http://localhost:8080]), but this can be configured in the **config.js** file

####watch
Watch for changes, and run respective tasks.

####zip
Make a .zip file containing the build content. It will be placed in the **releases/** directory, name with information from the **package.json** file:
**[name]_[version].zip**

##Karma+Jasmine Testing
The project is configured to use Karma and Jasmine for testing.

A special browserify task is configured to compile all **\*.spec.js** files in the src directory. This allows you to use **require()** when testing, which could be useful for things like:

* Require specific **.js** files when testing, instead of retrieving them from the compiled **app.js**
* Include dummy **.json** files when parsing data.
* Include dummy **.html** or **.jade** files.

The compiled **test.bundle.js** file includes a source map, so it will log the original file position when an error occurs.



###Karma
Karma is the engine that loads the **.js** and executes the tests.

All the karma specific configuration is located in the **karma.conf.js** file in the project root. When running the karma gulp tasks you can override these options.

###Jasmine
Jasmine is the framework used to write the tests. It is explained and demonstrated on their own website: 
[Jasmine 2.0](http://jasmine.github.io/2.0/introduction.html) 

A simple test could look like: 

```
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});
```