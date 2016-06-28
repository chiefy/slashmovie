'use strict'

const botBuilder = require('claudia-bot-builder');

module.exports = botBuilder(request => 
  `Thanks for sending ${request.text}.`
);
