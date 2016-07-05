'use strict';

const TMDBclient = require('themoviedbclient');
const apikey = require('../config.json').apikey;

const tmdb = new TMDBclient(apikey);

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
