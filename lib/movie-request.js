'use strict';

const SlackResponse = require('./slack-response.js');
const tmdbClient = require('./tmdb-client.js');
const MovieData = require('./movie-data.js');

const createResponse = movieData => {
	const response = new SlackResponse({
		responseType: 'in_channel',
		attachments: movieData.attachments
	});
	return response.raw;
};

module.exports = message => {
	if (!message.text || message.text.length === 0) {
		return 'Sorry, you must provide a movie title to look up.';
	}
	return tmdbClient
		.find(message.text)
		.then(rawData => {
			return new MovieData(rawData);
		})
		.then(createResponse)
		.catch(err => {
			if (err && err.message === 'not_found') {
				return `Sorry, couldn't find the movie "${message.text}".`;
			}
			return `Uh oh! Looks like something went wrong!\n${err.message}`;
		});
};
