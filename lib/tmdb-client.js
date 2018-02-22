'use strict';

const _ = require('lodash');

let config;

try {
	config = require('../conf/config.js');
} catch (err) {
	const message = 'no tmdb api key provided in config - ' + err.message;
	throw new Error(message);
}

const tmdb = new (require('tmdbapi'))({
	apiv3: config.apiKey
});

const getMovie = movieId => {
	if (!_.isInteger(movieId)) {
		return Promise.reject(new TypeError(`movie id provided is not of type integer`));
	}
	return tmdb.movie.details({ movie_id: movieId }); // eslint-disable-line camelcase
};

const searchMovie = movieTitle => {
	if (!movieTitle || movieTitle.length === 0) {
		return Promise.reject(new TypeError(`no movie title provided for search`));
	}
	return tmdb.search.movie({ query: movieTitle });
};

const doSearch = movieTitle => {
	return searchMovie(movieTitle)
		.then(data => {
			if (!data || !_.isArray(data.results) || data.results.length === 0) {
				Promise.reject(new Error(`could not find movie with title '{movieTitle}'`));
			}
			return getMovie(data.results[0].id);
		});
};

module.exports = {
	get: getMovie,
	search: searchMovie,
	find: doSearch
};
