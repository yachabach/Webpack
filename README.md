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
## Loaders  
Webpack allows any file type for which there is a loader.  .js and .jpg and others are already built in.  CSS, for example, is not.  
### CSS Loaders  
There are two tasks for bundling css: 
- translate the file for bundling (css-loader)  
- inject the resulting styles into the code (style-loader)  
To accomplish this we install the loaders from npm: ```npm i -D css-loader style-loader```
We tell webpack how to do this with another rule.  This rule includes a 'use' property for specifying the loader.  
```
{
    test: /\.css$/,
    use: [style-loader, css-loader]  
}
```
Remember, these loaders are used from back to front.  We have to use the css-loader before the style-loader.  
### Babel  
This is also a loader.  Remember, babel takes modern code and 'dumbs it down' for browsers that haven't caught up.  In other words, it takes modern features and builds the same functionality with older code.  Babel requires the following packages: ```npm install @babel/core babel-loader @babel/preset-env```.  It is configured in webpack like this:  
```
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env'],
                        plugins: []
                    }
                }
            }
```  
## Plugins  
Webpack plugins are like loaders except that they can do a lot more than load unique file types.  All of these plugins are imported with the require() function at the top of the file.  
### Minify the Bundle  
TerserPlugin is used to minify our javascript file making it faster-loading.  Plugins go in their own webpack config section:
```
plugins: [
    new TerserPlugin()
]
```  
Notice that plugins is an array of calls to instantiate a plugin object.  Normally we would have to install TerserPlugin but now it ships with Webpack 5.  

Even this tiny app realized a huge benefit from this plugin.  Before Terser the bundle was 19kb.  After Terser it was 5kb!  

Interestingly, we only use Terser for a production build and webpack automatically uses it.  So when we split the webpack config files into dev and prod, Terser doesn't show up in either.  
### Extract CSS  
We use another plugin to do this: 
```
npm i -D mini-css-extract-plugin
```  
We create the instance just as we did with TersePlugin() but we add a configuration object to specify the output file:  
```
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ]
```  
We also replace the style-loader with the MiniCssExtractPlugin.loader:  
```
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']  
            },
```  
Webpack finds and bundles all the css files into one file that we reference in the index.html page:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webpack Class</title>
    <link rel="stylesheet" href="./dist/styles.css">
</head>
<body>
    <script src="./dist/bundle.js"></script>
</body>
</html>
```  
## Automatic Browser Cache Reload  
We can automatically update the name of updated files using ```[contenthash]``` in our webpack configuration file: 
```
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/'
    },
    -
    -
    -
        plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css'
        })
    ]
```  
This option adds files to the dist folder but does not remove them.  We can: 
- use the clean: true property in the output key  
- add a plugin called CleanWebpackPlugin  

The second option is more customizable.  The first is simple.  I'll use the first.  
### Keeping up with Filename Changes in index.html  
Of course there is another plugin for this:
```
npm i -D html-webpack-plugin
```  
The good part of this package: 
- automatically updates filenames  
- minifies the file  

The bad part of this package:  
- resets Title and Description to defaults  
- minified html files are essentially unreadable  

We can use a configuration object at plugin instantiation to help us with these problems.  
```
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack Class',
            description: 'Basics of Webpack usage.',
            minify: false
        })
    ]
```  
The course uses handlebars to make the code even more readable but I haven't implemented that yet.  
## Production vs. Development  
Initially in this course, this is all done with the configuration file.  We changed our filename to webpack.dev.config.js, copied it, then renamed the copy to webpack.prod.config.js.  We changed the 'mode' property in each file respectively.   

All of this allows us to have two different scripts for prod and dev:  
#### package.json  
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.prod.config.js",
    "dev": "webpack serve --config webpack.dev.config.js --hot" 
  },
```
## Webpack Dev Server  
Here is the magic of hot module replacement (--hot), re-compile on save, and serving (serve) with devServer.  
```npm i -D webpack-dev-server```  
We configure the Webpack dev server in the .dev. config file under the property devServer:  
```
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        }
    },
```  
We are forcing the service to port 9000.  The 'static' keyword tells devServer the root directory of the files to serve.  devMiddleware defines the entry html file and forces webpack to write updates to disk, not to memory.  
## Multiple Files and Code Splitting  
When we have multiple pages (or entry points), we have to tell webpack about all of them.  We do so in an object that looks like this: 
```
entry: {
    <name>: <relative filename>,
    <name>: <relative filename>,
}
```  
We also have to allow webpack different names for each file.  We will fix that in the 'output' property using the [name] variable.  Also, if the multiple files represents multiple page endpoints, we have to tell the htmlWebpackPlugin how to handle those.  We use:
- 'filename:' to specify the html file to write to 
- 'chunks:' to specify the js files to associate with the html file
- chunks are defined implicitly with the entry property  

Chunks can get large with common dependencies.  An optimization called splitChunks allows us to specify which chunks we should split for common dependencies.  
```
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
```  

The updated webpack.dev.config.js file looks like this: 
#### webpack.prod.config.js   
```
module.exports = {
    entry: {
        'index': './src/index.js',
        'jake': './src/jakePage.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
        clean: true
    },
    ,
    ,
    ,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Webpack Class',
            chunks: ['index'],
            description: 'Basics of Webpack usage.',
            minify: false
        }),
        new HtmlWebpackPlugin({
            filename: 'jakePage.html',
            title: 'Jake Page',
            chunks: ['jakePage'],
            description: 'Picture of Awesome Jake and Dad in Dallas',
            minify: false
        })
    ]    
```  
## Integrating Express  
Remember, our pages are not hard-coded.  They are built with javascript and css.  Our initial express solution sent an html file with no visible content.  The embeded script files are considered 'static' files and are sent separately with each request.  So we have to let webpack know that's what we want to do - preface files in our dist folder with '/static/'.  We do that with the publicPath:
```
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/static/',
        clean: true
    },
```  
We also tell express where the static files live: 
#### server.js  
```
-
-
app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/index.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    res.send(contentFromHtmlFile);
});
-
-

```

