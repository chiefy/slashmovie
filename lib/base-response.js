'use strict';

const _ = require('lodash');
const BotTypes = require('./bot-types.js');

class BaseResponse {

	set botType(type) {
		if (!type) {
			return;
		}
		if (!_.isString(type) || !(type.toUpperCase() in BotTypes)) {
			throw new Error(`Invalid bot type: ${type}, currently supported: ${BotTypes}`);
		}
		this._botType = type;
	}
	get botType() {
		return this._botType || BotTypes.SLACK;
	}

}

module.exports = BaseResponse;
