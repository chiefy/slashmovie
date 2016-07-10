'use strict';

const TMDBclient = require('themoviedbclient');
const config = require('../config.js');

const tmdb = new TMDBclient(config.apikey);

const getTmdbPoster = imdbId => {
	return tmdb
		.call(`/find/${imdbId}`, {
			/* eslint-disable camelcase */
			external_source: 'imdb_id'
			/* eslint-enable*/
		})
		.then(data => {
			if (data && data.movie_results && data.movie_results.length) {
				return tmdb.getImageUrl(data.movie_results[0].poster_path, 'w500');
			}
			return null;
		});
};

module.exports = {
	getPoster: getTmdbPoster,
	client: tmdb
};
