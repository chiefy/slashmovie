'use strict';

const botBuilder = require('claudia-bot-builder');
const movieRequest = require('./movie-request')();

module.exports = botBuilder(movieRequest);
