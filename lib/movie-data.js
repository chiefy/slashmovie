'use strict';

const _ = require('lodash');

class MovieData {

	constructor(data) {
		this.adult = data.adult;
		this.imdbId = data.imdb_id;
		this.id = data.id;
		this.title = data.title;
		this.overview = data.overview;
		this.budget = data.budget;
		this.revenue = data.revenue;
		this.releaseDate = data.release_date;
		this.runtime = data.runtime;
		this.genres = _.map(data.genres, 'name');
		this.posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data.poster_path}`;
	}

	get fields() {
		return [
			{
				title: 'Genres',
				value: this.genres.join(', '),
				short: true
			},
			{
				title: 'Released',
				value: this.releaseDate,
				short: true
			},
			{
				title: 'Runtime',
				value: this.runtime,
				short: true
			},
			{
				title: 'Plot',
				value: this.overview,
				short: false
			}
		];
	}

	get attachments() {
		return [
			{
				title: '',
				imageUrl: this.posterUrl,
				color: '#4c5960'
			},
			{
				title: `${this.title} (${this.releaseDate.split('-')[0]})`,
				titleLink: `http://www.imdb.com/title/${this.imdbId}/`,
				fields: this.fields,
				color: '#4c5960'
			}
		];
	}

}

module.exports = MovieData;
