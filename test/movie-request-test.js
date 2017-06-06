'use strict';

import test from 'ava';

const fs = require('fs');
const path = require('path');
const mockery = require('mockery');
const _ = require('lodash');

let tmdb;

const searchData = fs.readFileSync(path.resolve('./mocks/search_results.json'), 'utf8');
const searchJSON = JSON.parse(searchData);
const movieData = fs.readFileSync(path.resolve('./mocks/fightclub.json'), 'utf8');
const movieJSON = JSON.parse(movieData);

mockery.registerMock('tmdbapi', () => {
	return {
		search: {
			movie: () => {
				return Promise.resolve(searchJSON);
			}
		},
		movie: {
			images: () => {
				return Promise.resolve(imageJSON);
			},
			details: () => {
				return Promise.resolve(movieJSON);
			}	
		}
	};
});

test.before(() => {
	mockery.enable({
		warnOnReplace: true,
		warnOnUnregistered: false,
		useCleanCache: true
	});
	tmdb = require('../lib/tmdb-client.js');
});

test('search movie', async t => {
	t.plan(2);
	const searchData = await tmdb.search('fight club');
	t.true(_.isObject(searchData), 'slash movie search returns an object');
	t.true(_.isArray(searchData.results), 'search results are an array');
});

test('get movie', async t => {
	const movieData = await tmdb.get(424);
	t.true(_.isObject(movieData), 'slash movie get returns a movie\'s details');
});

test('get movie throws error', t => {
	const fails1 = () => {
		return tmdb.get('asdfsdf');
	};
	const fails2 = () => {
		return tmdb.get(null);
	};
	t.throws(fails1(), TypeError, 'when integer not provided');
	t.throws(fails2(), TypeError, 'when integer not provided');
});

test('search throws error', t => {
	t.throws((() => {
		return tmdb.search();
	})(), TypeError, 'when no title given');
});

test('find', async t => {
	const findResults = await tmdb.find('fight club');
	t.true(_.isObject(findResults), 'find returns a single movie result');
	t.is(findResults.id, 550);
	t.is(findResults.runtime, 139);
});

test.after(() => {
	mockery.disable();
	mockery.deregisterAll();
});
