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

ifeq ($(DOCKER),true)
	START_COMMAND := docker run --rm -it --init -v ${PROJECT_ROOT}:/development legaci:development
else
	START_COMMAND :=
endif

.PHONY: help
help:
	@echo -e 'To run a task: ${GREEN}make [task_name]${DEFAULT}'
	@echo "\tExample: make test ENV='production'"
	@echo ''
	@echo 'By default the task will run in development environment mode using docker.'
	@echo -e 'The environment can be changed by passing ${YELLOW}ENV=[development|production|ci]${DEFAULT}.'
	@echo -e 'To run a command on the host without docker use argument ${YELLOW}DOCKER=false${DEFAULT}.'
	@echo "\tExample: make test ENV=development DOCKER=false"
	@echo ''
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "%s%-30s%s %s\n", "${CYAN}", $$1, "${DEFAULT}",$$2}'

.PHONY: install
install: ## Install Legaci for a specific environment setup. Possible environments ENV=development|ci
ifeq ($(ENV),development)
	@echo -e '${CYAN}Install Legaci for the development environment${DEFAULT}'
	make docker_build ENV=development
	${START_COMMAND} npm install
endif
ifeq ($(ENV),ci)
	@echo -e '${CYAN}Install Legaci for the ci environment${DEFAULT}'
	npm install
	npm install -g codecov
endif

.PHONY: docker_build
docker_build: ## Build Legaci docker image. Possible environments ENV=development
ifeq ($(ENV),development)
	@echo -e '${CYAN}Build Legaci development docker image: legaci:development${DEFAULT}'
	docker build -t legaci:development docker/development
endif

.PHONY: compile
compile: ## Compile the Typescript code.
	${START_COMMAND} ${NODE_MODULES}/tsc

.PHONY: compile_watch
compile_watch: ## Compile the Typescript code in watch mode.
	${START_COMMAND} ${NODE_MODULES}/tsc -w

.PHONY: lint
lint: ## Check the codestyle of the complete project.
	${START_COMMAND} ${NODE_MODULES}/eslint . --ext .ts

.PHONY: lint_fix
lint_fix: ## Check the codestyle of the complete project and auto fix errors.
	${START_COMMAND} ${NODE_MODULES}/eslint . --ext .ts --fix

.PHONY: test
test: test_unit test_integration## Run all the tests of the complete project.

.PHONY: test_unit
test_unit: ## Run all the unit tests of the complete project.
	${START_COMMAND} ${NODE_MODULES}/ava --config ava.config.unit.js

.PHONY: test_coverage
test_coverage: ## Calculate the unit test coverage of the complete project.
	${START_COMMAND} ${NODE_MODULES}/nyc -reporter=text-lcov --reporter=text --reporter=text-summary --reporter=html \
	${NODE_MODULES}/ava --config ava.config.unit.js

.PHONY: test_integration
test_integration: ## Run all the integration tests of the complete project.
	${START_COMMAND} ${NODE_MODULES}/ava --config ava.config.integration.js

.PHONY: test_acceptance
test_acceptance: ## Run all the acceptance tests of the complete project.
	${START_COMMAND} ${NODE_MODULES}/ava --verbose --serial **/acceptance/*.js
