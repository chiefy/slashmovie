'use strict';

const _ = require('lodash');
const BotTypes = require('./bot-types.js');
const Attachment = require('./slack-attachment.js');
const BaseReponse = require('./base-response.js');

class SlackResponse extends BaseReponse {

	constructor(config) {
		config = config || {};
		super(config);
		this.attachments = config.attachments;
		this.responseType = config.responseType;
		this.botType = BotTypes.SLACK;
	}

	addAttachment(attachment) {
		if (!(attachment instanceof Attachment)) {
			attachment = new Attachment(attachment);
		}
		this.attachments.push(attachment);
	}

	set attachments(attachments) {
		if (!attachments) {
			return;
		}
		if (!_.isArray(attachments)) {
			throw new TypeError('Attachments must be of type Array');
		}
		this._attachments = attachments.map(att => {
			if (!(att instanceof Attachment)) {
				return new Attachment(att);
			}
			return att;
		});
	}
	get attachments() {
		return this._attachments || [];
	}

	set responseType(type) {
		this._responseType = type;
	}
	get responseType() {
		return this._responseType || 'in_channel';
	}

	get rawAttachments() {
		return this.attachments.map(attachment => {
			return attachment.raw;
		});
	}

	get raw() {
		/* eslint-disable camelcase */
		return {
			response_type: this.responseType,
			attachments: this.rawAttachments
		};
		/* eslint-enable */
	}
}

module.exports = SlackResponse;
