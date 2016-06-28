const lodash = require('lodash');
const request = require('request-promise');
const botBuilder = require('claudia-bot-builder');
const base_url = 'https://www.omdbapi.com';

module.exports = botBuilder(request => {

  if(!request.text) {
    return 'Sorry, you must provide a movie title to look up.';
  }
  
  const title = request.text.trim();
  const request_opts = {
    uri: base_url,
    qs: {
      t: title,
      plot: 'short',
      r: 'json'
    },
    json: true
  };

  return request(request_opts)
  .then(data => {
    return `${data.Poster}\n${data.Title} (${data.Year})\ndir. ${data.Director}\nrating ${data.imdbRating}`;
  })
  .catch(err => {
    return `Uh oh! Looks like something went wrong!\n${err.message}`;
  });

});
