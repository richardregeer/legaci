/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');

shell.silent = true;

const FileHandler = require('../../../../src/core/file/FileHandler');

test.before((t) => {
  t.context.fileHandler = new FileHandler();

  shell.mkdir('-p', '.test/new-destination');
  shell.touch('.test/source-file.txt');
  shell.echo('Some test data').to('.test/read-file.txt');
});

test.after(() => {
  shell.rm('-rf', shell.pwd() + '/.test');
});

test('WriteFile should write to file on the given path', (t) => {
  const { fileHandler } = t.context;

  fileHandler.writeFileSync(
    shell.pwd() + '/.test/write-file.txt',
    'some test data'
  );

  const path = '.test/write-file.txt';
  const result = shell.find(path);

  t.is(result[0], path);
});

test('WriteFile create the destination directory when it does not exists', (t) => {
  const { fileHandler } = t.context;

  fileHandler.writeFileSync(
    shell.pwd() + '/.test/write-destination/write-file.txt',
    'some test data'
  );

  const path = '.test/write-destination/write-file.txt';
  const result = shell.find(path);

  t.is(result[0], path);
});

test('CopyFile should copy a file from source to the given destination', (t) => {
  const { fileHandler } = t.context;

  fileHandler.copyFileSync(
    shell.pwd() + '/.test/source-file.txt',
    shell.pwd() + '/.test/new-destination/source-file.txt'
  );

  const result = shell.find('.test/new-destination/source-file.txt');

  t.is(result.length, 1);
});

test('CopyFile should raise an error when the source file does not exists', (t) => {
  const { fileHandler } = t.context;

  t.throws(() => {
    fileHandler.copyFileSync(
      shell.pwd() + '/.test/unknowfile.txt',
      shell.pwd() + '/.test/new-destination/unknowfile.txt'
    );
  }, Error);
});

test('CopyFile should create the destination directory when it does not exists', (t) => {
  const { fileHandler } = t.context;

  fileHandler.copyFileSync(
    shell.pwd() + '/.test/source-file.txt',
    shell.pwd() + '/.test/other/destination/source-file.txt'
  );

  const result = shell.find('.test/other/destination/source-file.txt');

  t.is(result.length, 1);
});

test('Readfile should return the content of the file', (t) => {
  const { fileHandler } = t.context;

  const result = fileHandler.readFileSync(
    shell.pwd() + '/.test/read-file.txt'
  );

  t.is(result, 'Some test data\n');
});

test('ReadFile should raise an error when the file does not exists', (t) => {
  const { fileHandler } = t.context;

  t.throws(() => {
    fileHandler.readFileSync(
      shell.pwd() + '/.test/unknowfile.txt'
    );
  }, Error);
});
