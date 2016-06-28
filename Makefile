
MODULE := bot

.PHONY: create destroy update-slack

create:
	@claudia create \
	--name $(MODULE) \
	--config $(MODULE).json \
	--region us-east-1 \
	--timeout 5 \
	--api-module $(MODULE)

update-slack:
	@claudia update \
	--config $(MODULE).json \
	--configure-slack-slash-command

destroy:
	@claudia destroy \
	--config $(MODULE).json
