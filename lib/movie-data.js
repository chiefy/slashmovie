'use strict';

class MovieData {

	constructor(data) {
		this.imdbId = data.imdbID;
		this.title = data.Title;
		this.year = data.Year;
		this.director = data.Director;
		this.actors = data.Actors;
		this.releaseDate = data.Released;
		this.runtime = data.Runtime;
		this.plot = data.Plot;
		this.genre = data.Genre;
		this.scores = {
			metacritic: data.Metascore,
			imdb: data.imdbRating
		};
	}

	get fields() {
		return [
			{
				title: 'Director',
				value: this.director,
				short: true
			},
			{
				title: 'Genres',
				value: this.genre,
				short: true
			},
			{
				title: 'Rating',
				value: `IMDB: ${this.scores.imdb} / Metacritic: ${this.scores.metacritic}`,
				short: true
			},
			{
				title: 'Featuring',
				value: this.actors,
				short: true
			},
			{
				title: 'Plot',
				value: this.plot,
				short: false
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
				title: `${this.title} (${this.year})`,
				titleLink: `http://www.imdb.com/title/${this.imdbId}/`,
				fields: this.fields,
				color: '#4c5960'
			}
		];
	}

}

module.exports = MovieData;
