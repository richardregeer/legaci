.DEFAULT_GOAL := help

RED=\033[31m
CYAN=\033[36m
YELLOW=\033[33m
GREEN=\033[32m
DEFAULT=\033[0m

ENV := development
DOCKER := true
PROJECT_ROOT := $(shell pwd)
NODE_MODULES := ./node_modules/.bin

START_COMMAND :=

.PHONY: help
help:
	@echo -e 'To run a task: ${GREEN}make [task_name]${DEFAULT}'
	@echo "\tExample: make test ENV='production'"
	@echo ''
	@echo 'By default the task will run in development environment mode using docker.'
	@echo -e 'The environment can be changed by passing ${YELLOW}ENV=[development|production|ci]${DEFAULT}.'
	@echo -e 'To run a command on the host without docker use argument ${YELLOW}DOCKER=false${DEFAULT}.'
	@echo "\tExample: make start ENV=production DOCKER=false"
	@echo ''
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%s%-30s%s %s\n", "${CYAN}", $$1, "${DEFAULT}",$$2}'

# # .PHONY: install
# # install: ## Install the docker google drive sync development environment. Possible environments ENV=development|ci
# # ifeq ($(ENV),development)
# # 	@echo -e '${CYAN}Install the docker google drive sync development environment${DEFAULT}'
# # 	make build
# # 	${START_COMMAND} npm install
# # endif
# # ifeq ($(ENV),ci)
# # 	@echo -e '${CYAN}Install the docker google drive sync ci environment${DEFAULT}'
# # 	npm install
# # endif

.PHONY: lint
lint: ## Check the codestyle of the complete project.
	${START_COMMAND} ${NODE_MODULES}/eslint .

.PHONY: test
test: ## Run all the tests of the complete project.
	${START_COMMAND} ${NODE_MODULES}/ava --verbose

.PHONY: test_watch
test_watch: ## Continuously run all the tests of the complete project.
	${START_COMMAND} ${NODE_MODULES}/ava --verbose --watch