
MODULE ?= movie
AWS_REGION ?= us-east-1
AWS_PROFILE ?= default
TMDB_API_KEY ?= <your-api-key-here>

.PHONY: create destroy update-slack update test clean

node_modules:
	@npm install

lint: node_modules
	@xo

conf/config.js:
	@mkdir -p ./conf
	@echo 'module.exports = {\n  "apiKey": "$(TMDB_API_KEY)"\n};' > $@

create: conf/config.js
	@claudia create \
	--name $(MODULE) \
	--config $(MODULE).json \
	--region $(AWS_REGION) \
	--profile $(AWS_PROFILE) \
	--timeout 10 \
	--api-module $(MODULE)

update-slack: conf/config.js
	@claudia update \
	--config $(MODULE).json \
	--profile $(AWS_PROFILE) \
	--configure-slack-slash-command

update: conf/config.js
	@claudia update \
	--config $(MODULE).json

destroy:
	@claudia destroy \
	--config $(MODULE).json &&\
	rm $(MODULE).json

test: node_modules
	@npm run test

clean:
	@rm -rf node_modules conf/config.js
