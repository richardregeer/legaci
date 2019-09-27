/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');
const chalk = require('chalk');

const Logger = require('../../../src/logging/Logger');

test.beforeEach((t) => {
  t.context.logger = sinon.stub({
    info() {},
    error() {},
    debug() {},
    warn() {}
  });

  t.context.loggerAdapter = new Logger(t.context.logger);
});

test('Should forward info to the logger', (t) => {
  const { loggerAdapter, logger } = t.context;

  loggerAdapter.info('test');

  t.true(logger.info.calledWith('test'));
});

test('Should forward error to the logger', (t) => {
  const { loggerAdapter, logger } = t.context;

  loggerAdapter.error('test');

  t.is(logger.error.firstCall.lastArg, chalk.red('test'));
});

test('Should forward warning to the logger', (t) => {
  const { loggerAdapter, logger } = t.context;

  loggerAdapter.warning('test');

  t.is(logger.warn.firstCall.lastArg, chalk.yellow('test'));
});

test('Should forward debug to the logger', (t) => {
  const { loggerAdapter, logger } = t.context;

  loggerAdapter.debug('test');

  t.is(logger.debug.firstCall.lastArg, 'test');
});
