Gulp
=====================

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

##Alias Tasks
The following tasks are placed in **gulpfile.js**, and executes a group of tasks to compile the project.

####default
Start developing by calling build, watch, serve and open.

####build
Compiles the project

####release
Compile the project for release, minifying JS, etc.

####deploy
Compile a release build, test it and upload to FTP.


##Tasks
Tasks placed in **gulp/tasks/** will be added to gulp, so you can run them. Feel free to delete unneeded tasks or add more. Just make sure to update the task groups to reflect any missing tasks.

####assets
Copy over assets to the build directory.

####bower
Concat bower components into .js and .css files.

####browserify
Compile JS using [browserify](http://browserify.org/).

####coverage
Compiles a version of app.js that includes code coverage. This is used by karma to generate reports.

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
Compile the main less file, and attach source maps. In release mode the .less files are run through AutoPrefix to add vendor tags, and it gets minified.

####protractor
Starts a Selenium web driver, and runs Protractor with all **.scenario.js** files.

	gulp protractor
	
####[test](test)
Tasks that start a Karma server up using the **karma.conf.js** configuration. It exposes the following tasks.


Single run test:

	gulp test
	
To keep watching for changes:
	
	gulp test-watch

####testify
Compile and browserify the **.spec.js** files into a bundle. This task is called directly by [test](#test).

####open
Opens the browser and navigate to the local server.

####serve
Create a local server. Default path is [http://localhost:8080]([http://localhost:8080]), but this can be configured in the **config.js** file

####watch
Watch for changes, and run respective tasks.

####zip
Make a .zip file containing the build content. It will be placed in the **releases/** directory, name with information from the **package.json** file:
**[name]_[version].zip**