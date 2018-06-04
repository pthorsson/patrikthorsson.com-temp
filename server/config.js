'use strict';

const path = require('path');

var config = {

    root: __dirname,
    env: process.env.ENV || 'PROD',

    server: {
        port: process.env.PORT || 9005
    },

    setRoot: (dir) => {
        config.root = config.env === 'PROD' ? path.normalize(dir + '/../dist') : path.normalize(dir + '/..');
        return config;
    },

    set: (key, data) => {
        config[key] = data;
        return config;
    }

};

module.exports = config;
