'use strict';

const SlackResponse = require('./slack-response.js');
const MovieData = require('./movie-data.js');

let _requestModule;
let _tmdbClient;
let _omdbClient;

const handleMovieData = data => {
	if (data && data.Response === 'False') {
		throw new Error('not_found');
	}
	const movieData = new MovieData(data);
	return _tmdbClient
		.getPoster(movieData.imdbId)
		.then(posterUrl => {
			movieData.posterUrl = posterUrl;
			return movieData;
		});
};

const createResponse = movieData => {
	const response = new SlackResponse({
		responseType: 'in_channel',
		attachments: movieData.attachments
	});
	return response.raw;
};

const doRequest = req => {
	if (!req.text) {
		return 'Sorry, you must provide a movie title to look up.';
	}
	_omdbClient.setTitle(req.text.trim());
	return _requestModule(_omdbClient.options)
		.then(handleMovieData)
		.then(createResponse)
		.catch(err => {
			if (err && err.message === 'not_found') {
				return `Sorry, I couldn't find "${_omdbClient.getTitle()}".`;
			}
			return `Uh oh! Looks like something went wrong!\n${err.message}`;
		});
};

module.exports = (requestModule, tmdbClient, omdbClient) => {
	_requestModule = requestModule || require('request-promise');

	_tmdbClient = tmdbClient || require('./tmdb-client.js');

	_omdbClient = omdbClient || require('./omdb-client.js');

	return doRequest;
};
