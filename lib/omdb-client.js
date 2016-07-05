'use strict';

const OMDBRequestOptions = {
	uri: 'https://www.omdbapi.com',
	qs: {
		t: null,
		plot: 'short',
		r: 'json'
	},
	json: true
};

module.exports = {
	options: OMDBRequestOptions,
	setTitle: title => {
		OMDBRequestOptions.qs.t = title;
	},
	getTitle: () => {
		return OMDBRequestOptions.qs.t;
	}
};
