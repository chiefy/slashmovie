
MODULE ?= movie
TMDB_API_KEY ?= yourapikeygoeshere

.PHONY: create destroy update-slack update

node_modules:
	@npm install

lint: node_modules
	@xo

config.json:
	@jq -n --arg val "$(TMDB_API_KEY)" '{ "apikey": $$val }' > $@

create: config.json
	@claudia create \
	--name $(MODULE) \
	--config $(MODULE).json \
	--region us-east-1 \
	--timeout 8 \
	--api-module $(MODULE)

update-slack: config.json
	@claudia update \
	--config $(MODULE).json \
	--configure-slack-slash-command

update: config.json
	@claudia update \
	--config $(MODULE).json

destroy:
	@claudia destroy \
	--config $(MODULE).json &&\
	rm $(MODULE).json
