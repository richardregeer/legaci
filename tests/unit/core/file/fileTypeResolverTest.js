/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const sinon = require('sinon');

const FileTypes = require('../../../../src/core/file/fileTypes');
const FileTypeResolver = require('../../../../src/core/file/FileTypeResolver');

test.beforeEach((t) => {
  t.context.cli = sinon.stub({
    grep() {},
    head() {}
  });
  t.context.cli.head.returns(t.context.cli);
  t.context.cli.grep.returns([]);

  t.context.resolver = new FileTypeResolver(t.context.cli);
});

test('GetFileType should return ZIP when path contains a zip file', (t) => {
  const { resolver } = t.context;

  const result = resolver.getFileType('/test/path/file.zip');

  t.is(result, FileTypes.ZIP);
});

test('GetFileType should return EXE when path contains a exe file', (t) => {
  const { resolver } = t.context;

  const result = resolver.getFileType('/test/path/file.exe');

  t.is(result, FileTypes.EXE);
});

test('GetFileType should return SH when path contains a shell file', (t) => {
  const { resolver } = t.context;

  const result = resolver.getFileType('/test/path/file.sh');

  t.is(result, FileTypes.SH);
});

test('GetFileType should throw an exception when file type is unknown', (t) => {
  const { resolver } = t.context;

  t.throws(() => {
    resolver.getFileType('/test/path/file.something');
  }, Error);
});
