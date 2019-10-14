/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const Logger = require('../../../../src/logging/Logger');
const FileHandler = require('../../../../src/core/file/FileHandler');
const Template = require('../../../../src/core/file/Template');
const TemplateFactory = require('../../../../src/core/file/TemplateFactory');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);

  t.context.factory = new TemplateFactory(t.context.fileHandler, t.context.logger);
});

test('Create template should return a new template instance', (t) => {
  const { factory } = t.context;

  const result = factory.createTemplate('/test/path');

  t.true(result instanceof Template);
});
