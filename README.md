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
Copy and minify images.

####jade
Compile the main jade file.

####less
Compile the main less file, and attach source maps. In release mode the css file will also be minified.

####lint
Run the .js files through JSHint, using the settings in **.jshintrc**. Change these to suit the project.

####open
Opens the browser and navigate to the local server.

####serve
Create a local server. Default path is [http://localhost:8080]([http://localhost:8080]), but this can be configured in the **config.js** file

####watch
Watch for changes, and run respective tasks.

####zip
Make a .zip file containing the build content. It will be placed in the **releases/** directory, name with information from the **package.json** file:
**[name]_[version].zip**


##Spritesheets
**gulp-svg-sprites** is used create a sprite sheet from .svg files, outputting both an .svg and .png spritesheet.

###Including CSS
A CSS file is generated with classes for all the sprites. You should include this in the app.less file:

    @import (less) "../sprites/css/_sprites.css";

### Preparing SVG's
Make sure to crop the SVG, and set the correct pixel dimensions before exporting.

#### Illustrator
Save your file as SVG with the following settings:

- SVG Profiles: SVG 1.1
- Fonts Type: SVG
- Fonts Subsetting: None
- Options Image Location: Embed
- Advanced Options
  - CSS Properties: Presentation Attributes
  - Decimal Places: 1
  - Encoding: UTF-8
  - Output fewer <tspan> elements: check

Leave the rest unchecked.

More in-depth information: [http://www.adobe.com/inspire/2013/09/exporting-svg-illustrator.html](http://www.adobe.com/inspire/2013/09/exporting-svg-illustrator.html)