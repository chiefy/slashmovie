
MODULE ?= movie
AWS_REGION ?= us-east-1
TMDB_API_KEY ?= yourapikeygoeshere

.PHONY: create destroy update-slack update test clean

node_modules:
	@npm install

lint: node_modules
	@xo

config.js:
	@echo 'module.exports = {\n  "apikey": "$(TMDB_API_KEY)"\n};' > $@

create: config.js
	@claudia create \
	--name $(MODULE) \
	--config $(MODULE).json \
	--region $(AWS_REGION) \
	--timeout 5 \
	--api-module $(MODULE)

update-slack: config.js
	@claudia update \
	--config $(MODULE).json \
	--configure-slack-slash-command

update: config.js
	@claudia update \
	--config $(MODULE).json

destroy:
	@claudia destroy \
	--config $(MODULE).json &&\
	rm $(MODULE).json

test: node_modules
	@npm run test

clean:
	@rm -rf node_modules config.js
