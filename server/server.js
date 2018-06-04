'use strict';

const path = require('path');
const express = require('express');
const compress = require('compression');
const send = require('send');

const config = require('./config');

const app = express();

config.setRoot(path.normalize(__dirname));

app.use(compress());

if (config.env === 'DEV') {
    app.use(express.static(path.join(config.root, '.tmp')));
}

app.use(express.static(path.join(config.root, 'app')));

app.get('/', function(req, res, next) {
    let indexHtml = path.join(config.root, 'app/index.html');
    send(req, indexHtml).pipe(res).on('error', next);
});

app.get('/*', function(req, res, next) {
    res.redirect('/');
});

app.listen(config.server.port);

console.log(`PORT: ${config.server.port}`);
console.log(`ROOT: ${config.root}`);
console.log(`ENV:  ${config.env}`);
