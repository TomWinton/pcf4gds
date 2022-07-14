# React PCF GDS Components 
*** Run all NPM install, Story Book and Build / Publish Commands from this directories package.json ***

## Purpose
The aim is to provide components from the GDS front end system as React components that can be served on a Microsoft Portal. As many of the themes and patterns are common this project aims to share components and functions where it's logical. Currently the react components themselves have been installed from a 3rd party library : https://github.com/govuk-react . It's not perfect and writing them manually might be better.

## Project Structure
The root directories package.json is where you ideally will use to install all node modules for the project in an attempt to avoid version mismatches admin. 

Each component's initial folder is in the root directory (E.G date, option, string). You can build / run each component seperately in test harness or run them all in story book from the root directory. 

The root folders src folder containers a helper component which more stuff can be thrown into. Write now the main things it does is generate a unique id for the input if one wasn't specified and also each component is using the same interface to generate input paramaters. 
 
## Installing
I did something lazy to get the pcf scripts to run properly against specific directories which you'd need to replicate in order to run this repo. I modified the pcf-script in this directory: \node_modules\pcf-scripts\bin\pcf-scripts.js .

You can either replace the file directly with the one found in the directory "pcfscript modified backup" after initially installing the package or you can find the relavent section in the file and directly replace it with the below (or do something less dumb than this)

```Javascript
            //Changes: 
		    let fileConfigPath = constants.CONFIGURATION_FILE_NAME.toString();
			if(yargs_1.argv['customPath'] != null && yargs_1.argv['customPath'] != undefined && yargs_1.argv['customPath'].length > 0)
			{
				fileConfigPath = yargs_1.argv['customPath'] + "/"+   fileConfigPath
				console.log(fileConfigPath);
			}
            //Just before these lines
            const fileConfig = fs.readFileSync(path.resolve('.',fileConfigPath ));
            const config = JSON.parse(fileConfig.toString());
```


## NPM Scripts
build-storybook
Builds the initial storybook. Definitely needs running on installation for storybook to work. Might need running once stories have been changed. I haven't bothered finding out. 

storybook
Runs storybook..

start<FolderName>, refreshTypes<FolderName> build<FolderName>:
Runs the respective pac pcf command

toDataverse:
Executes a powershell script, pass it an argument that is the name of the component folder.     E.G: "npm run toDataverse string" .  Will increment the version on the control manifest and push the control into whatever environment you're pac'd into. 

## Adding new components
The aim is to have only one component per attribute type or type group, we can modify the design / layout based on bound input parameters. So you may want to build on top of an existing component instead but I don't know. I'm not your mum. Do what you like.

Easiest way is just to copy and paste an existing component from this project in, if not just make sure anything that needs to point at a node_modules folder is looking the directory before (e.g tsconfig : typeRoots , extends ).

To make use of the shared container and the interface reference the main interface. 

You'll need to add some new lines to the package.json scripts for the pcf commands, provided your folder layout is the same as the other ones you just need to copy another line, rename it using the first folder name as the customPath argument. 


