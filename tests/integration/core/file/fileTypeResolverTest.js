/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');

shell.silent = true;

const FileTypeResolver = require('../../../../src/core/file/FileTypeResolver');
const fileTypes = require('../../../../src/core/file/fileTypes');

test.before((t) => {
  t.context.resolver = new FileTypeResolver(shell);
});

test('getFileTypePackageType should return a zip file when a GOG.com sh file', (t) => {
  const { resolver } = t.context;

  const result = resolver.getFileType('tests/fixtures/files/gog_bio_menace_2.0.0.2.sh');

  t.is(result, fileTypes.ZIP);
});

test('getFileTypePackageType should return a shell file when file has a sh extension', (t) => {
  const { resolver } = t.context;

  const result = resolver.getFileType('tests/fixtures/files/somefile.sh');

  t.is(result, fileTypes.SH);
});

test('getFileTypePackageType should return a exe file when file has an exe extension', (t) => {
  const { resolver } = t.context;

  const result = resolver.getFileType('tests/fixtures/files/somefile.exe');

  t.is(result, fileTypes.EXE);
});

test('getFileTypePackageType should return a zip file when file has a zip extension', (t) => {
  const { resolver } = t.context;

  const result = resolver.getFileType('tests/fixtures/files/somefile.zip');

  t.is(result, fileTypes.ZIP);
});
