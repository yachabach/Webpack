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