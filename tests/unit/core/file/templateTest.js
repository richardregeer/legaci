/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const Logger = require('../../../../src/logging/Logger');
const FileHandler = require('../../../../src/core/file/FileHandler');
const Template = require('../../../../src/core/file/Template');

test.beforeEach((t) => {
  t.context.logger = sinon.createStubInstance(Logger);
  t.context.fileHandler = sinon.createStubInstance(FileHandler);

  t.context.template = new Template('etc/tenplate/test', t.context.fileHandler, t.context.logger);
});

test('Load should load and return the template file', (t) => {
  const { template, fileHandler } = t.context;
  fileHandler.readFileSync.returns('test-template-body');

  const result = template.load();

  t.is('test-template-body', result);
});

test('Load should rethrow the error when load fails', (t) => {
  const { template, fileHandler } = t.context;
  fileHandler.readFileSync.throws(new Error());

  t.throws(() => {
    template.load();
  }, Error);
});

test('Save should save the template file to the given destination', (t) => {
  const { template, fileHandler } = t.context;

  template.save('destination/path');

  t.true(fileHandler.writeFileSync.called);
});

test('Save should throw an error when save is unsuccesfull', (t) => {
  const { template, fileHandler } = t.context;
  fileHandler.writeFileSync.throws(new Error());

  t.throws(() => {
    template.save('destination/path');
  }, Error);
});

test('Replace should replace a template variable in the template body', (t) => {
  const { template } = t.context;

  template.template = 'Test={{TEST}}';

  const result = template.replaceVariable('TEST', 'TEST-VALUE');

  t.is(result, 'Test=TEST-VALUE');
});
