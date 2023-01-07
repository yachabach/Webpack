const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/jakePage.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    res.send(contentFromHtmlFile);
});

app.listen(9002, () => {
    console.log('Application is running on http://localhost:9002/')
})