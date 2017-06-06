# Slashmovie

Use a Slack slash command to find movie information!

![slashmovie](http://i.imgur.com/4U836Yo.gif)

Slashmovie is a project that leverages [claudiaJS](https://claudiajs.com/) and [claudia-bot-builder](https://github.com/claudiajs/claudia-bot-builder) to build and deploy to AWS Lambda and AWS API Gateway for a cheap / low-cost hosting solution.

## Prereqs
If you would like to deploy this yourself, you will need the following:

  * A valid AWS account, with credentials that allow for AWS Lambda, AWS API Gateway and s3 access.
  * [The Movie Database API](https://developers.themoviedb.org/3/) key (see-below)
  * Slack slash command token
  * GNU Make
  * jq
  * npm

## TMDB API Key
In order to deploy, you will need a [The Movie DB](https://www.themoviedb.org/) API key for looking up movie data.

To set your TMDB key:

```
$ export TMDB_API_KEY=aflkj02e2elfkmsd092lk
```

or use it as a parameter when using `make`:

```
$ make create TMDB_API_KEY=aflkj02e2elfkmsd092lk
```

## Deployment

To create the initial deploy:

```
$ make create
```

To update project with your own Slack API token:

```
$ make update-slack
```

To redeploy:

```
$ make update
```

To destroy all associated AWS resources (be careful!)

```
$ make destroy
```


## Testing
I've included a few 'smoke' tests to make sure things work with mocked out API responses, but testing in AWS Lambda is currently hard. This project uses the AVA test runner along with XO for linting.

```
$ npm run test
```
