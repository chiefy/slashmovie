'use strict';

const _ = require('lodash');

class SlackField {

	constructor(field) {
		field = field || {};
		this.title = field.title;
		this.short = field.short;
		this.value = field.value;
	}

	set title(title) {
		this._title = title;
	}
	get title() {
		return this._title || '';
	}

	set short(isShort) {
		this._short = Boolean(isShort);
	}
	get short() {
		return _.isBoolean(this._short) ? this._short : false;
	}

	set value(fieldValue) {
		this._value = fieldValue;
	}
	get value() {
		return this._value || '';
	}

	get raw() {
		return {
			title: this.title,
			short: this.short,
			value: this.value
		};
	}
}

module.exports = SlackField;
