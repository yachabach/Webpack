# Udemy Webpack Course  
## App Setup  
The course starts by setting up a very simple HTML file and two javascript files:
#### index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webpack Class</title>
</head>
<body>
    <script src="./src/hello-world.js"></script>
    <script type="module" src="./src/index.js"></script>
    
</body>
</html>
```  
#### hello-world.js  
```
const helloWorld = () => {
    console.log('Hello world');
};
```  
#### index.js  
```
helloWorld();
```
In this demo, note that we don't have to use modules or imports or anything.  We MUST however, list our script files in a specific order to make sure the index.js has a definition for helloWorld().  In larger applications, this is a problem.  
## Adding Package Management and Bundling  
### Package Management with npm  
We start by setting up the package manager with ```npm init -y```.  This gives us our package.json file with minimal configurations: 
#### package.json
```
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```  
Then we install webpack and the webpack cli to the development dependencies with ```npm i -D webpack webpack-cli```.
### First Webpack Run  
In this first run we added imports and exports to the .js files and removed the hello-world script from the .html file.  We made no configuration changes to webpack.  We ran it from the command line with ```npx webpack```.  If you want to see all Webpack did, use ```npx webpack --stats detailed```.   

Webpack adds a dist folder with main.js.  main.js is the bundled index.js and hello-world.js files.  
#### main.js  
```
(()=>{"use strict";console.log("Hello world")})();
```  
### Repeating First Run With a Config File  
#### webpack.config.js  
Configuration files cannot be modules (yet) so the ECMA import statement cannot be used here.  We must use the node 'require' function.
```
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    }
}
```  
Note that we are sending our output to bundle.js.  Our index.html references index.js.  We must keep the html file here for now and we must change the filename to the bundle.js file if we want to test that it works.  
### Scripting Webpack
Adding ```"build": "webpack"``` to the package.json file simplifies calling webpack.  
## Asset Modules  
Asset files can be handled [in accordance with 4 rules](https://webpack.js.org/guides/asset-modules/): 
- asset/resource  
- asset/inline  
- asset  
- asset/source    
### asset/resource  
The asset/resource rule is used for asset files that are part of the package or located in a CDN or other online source. In the class, it is used for .jpg/.png files.  The class builds a function that creates an img element and uses a .jpg file as it's source.  We want to tell webpack how to handle .jpg files.
```
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            }
        ]
    }
```  
### asset/inline  
The asset/inline rule is similar except that it bundles the asset into the bundle.js file.  If that is a .jpg, the file will get VERY large very quickly.  However, every additional file represents an additional http request to bring it to the browser.  So .svg/.ico files would be a good choice for this kind of asset rule.  
### asset  
This one makes the decision for us based on file size.  By default, anything over 8kb is handled as asset/resource; anything under 8kb is treated as asset/inline.  The 8kb limit can be modified with:
```
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024
                    }
                }
            }
        ]
    }
```
### asset/source  
In this exercise, asset/source is similar to inline except that the file is not converted to base64.  It is useful for text files.  We would add a rule to the rules array:
```
{
    test: /\.txt$/,
    type: 'asset/source'
}
```
