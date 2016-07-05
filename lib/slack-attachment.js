'use strict';

const _ = require('lodash');
const Field = require('./slack-field.js');

class SlackAttachment {

	constructor(attachment) {
		attachment = attachment || {};
		this.title = attachment.title;
		this.titleLink = attachment.titleLink;
		this.color = attachment.color;
		this.thumbUrl = attachment.thumbUrl;
		this.fallback = attachment.fallback;
		this.pretext = attachment.pretext;
		this.text = attachment.text;
		this.fields = attachment.fields;
		this.imageUrl = attachment.imageUrl;
		this.footer = attachment.footer;
		this.footerIcon = attachment.footerIcon;
		this.author = [
			attachment.authorName,
			attachment.authorLink,
			attachment.authorIcon
		];
		this.useTs = attachment.useTs;
	}

	set title(title) {
		this._title = title;
	}
	get title() {
		return this._title || '';
	}

	set titleLink(titleLink) {
		this._titleLink = titleLink;
	}
	get titleLink() {
		return this._titleLink || '';
	}

	set text(text) {
		this._text = text;
	}
	get text() {
		return this._text || '';
	}

	set pretext(pretext) {
		this._pretext = pretext;
	}
	get pretext() {
		return this._pretext || null;
	}

	set footer(footer) {
		this._footer = footer;
	}
	get footer() {
		return this._footer || null;
	}

	set footerIcon(footerIcon) {
		this._footerIcon = footerIcon;
	}
	get footerIcon() {
		return this._footerIcon || null;
	}

	set imageUrl(imageUrl) {
		this._imageUrl = imageUrl;
	}
	get imageUrl() {
		return this._imageUrl || null;
	}

	set thumbUrl(thumbUrl) {
		this._thumbUrl = thumbUrl;
	}
	get thumbUrl() {
		return this._thumbUrl || null;
	}

	set color(color) {
		this._color = color;
	}
	get color() {
		return this._color || '#ffffff';
	}
	set author(authorData) {
		this._author = {
			name: authorData[0],
			link: authorData[1],
			icon: authorData[2]
		};
	}
	get author() {
		return this._author || null;
	}

	set useTs(useTs) {
		this._useTs = _.isBoolean(useTs) ? useTs : false;
	}
	get useTs() {
		return this._useTs || false;
	}

	addField(field) {
		if (!(field instanceof Field)) {
			field = new Field(field);
		}
		this.fields.push(field);
	}
	get fields() {
		return this._fields || [];
	}
	set fields(fields) {
		if (!fields) {
			return;
		}
		if (!_.isArray(fields)) {
			throw new Error('Fields must be of type Array');
		}
		this._fields = [];
		fields.forEach(field => {
			this.addField(field);
		});
	}

	get rawFields() {
		return this.fields.map(field => {
			return field.raw;
		});
	}

	get raw() {
		/* eslint-disable camelcase */
		const rawObj = {
			fallback: this.fallback,
			color: this.color,
			pretext: this.pretext,
			author_name: this.author.name,
			author_link: this.author.link,
			author_icon: this.author.icon,
			title: this.title,
			title_link: this.titleLink,
			text: this.text,
			fields: this.rawFields,
			image_url: this.imageUrl,
			thumb_url: this.thumbUrl,
			footer: this.footer,
			footer_icon: this.footerIcon,
			ts: this._useTs ? Date.now() : null
		};
		/* eslint-enable */
		return _.omitBy(rawObj, v => {
			return _.isNull(v) || _.isUndefined(v);
		});
	}

}

module.exports = SlackAttachment;
