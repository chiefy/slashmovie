'use strict';

import test from 'ava';

const fs = require('fs');
const path = require('path');
const mockery = require('mockery');
const _ = require('lodash');

const gooniesData = fs.readFileSync(path.resolve('./mocks/goonies.json'), 'utf8');
const gooniesJSON = JSON.parse(gooniesData);

const setupMocks = () => {
	mockery.registerMock('request-promise', () => {
		return Promise.resolve(gooniesJSON);
	});
	mockery.registerMock('../lib/tmdb-client.js', {
		getPoster: imdbId => {
			return Promise.resolve(`http://imdb.com/poster/${imdbId}`);
		}
	});
	const request = require('request-promise');
	const tmdb = require('../lib/tmdb-client.js');
	const movieRequest = require('../lib/movie-request.js')(request, tmdb);

	return movieRequest({
		text: 'goonies'
	});
};

test.before(() => {
	mockery.enable({
		warnOnReplace: false,
		warnOnUnregistered: false,
		useCleanCache: true
	});
});

test('has attachments', t => {
	return setupMocks()
		.then(result => {
			t.truthy(_.isArray(result.attachments), 'slash movie request exists');
			t.is(result.attachments.length, 2, 'has two attachments');
		});
});

test('has proper title', t => {
	return setupMocks()
		.then(result => {
			const title = result.attachments[1].title;
			t.is(title, 'The Goonies (1985)', 'has the correct title');
		});
});

test('has fields', t => {
	const MovieData = require('../lib/movie-data.js');

	return setupMocks()
		.then(result => {
			const data = new MovieData(gooniesData);
			const fields = result.attachments[1].fields;
			t.truthy(_.isArray(fields), 'has the fields');
			t.is(fields.length, data.fields.length);
		});
});

test.after(() => {
	mockery.disable();
	mockery.deregisterAll();
});
