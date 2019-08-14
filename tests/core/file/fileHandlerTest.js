'use strict';

const test = require('ava');
const fs = require('fs');
const shell = require('shelljs');

const FileHandler = require('../../../src/core/file/FileHandler');

test.before((t) => {
  t.context.fileHandler = new FileHandler();

  shell.mkdir('-p', '.test/new-destination');
  shell.touch('.test/source-file.txt');
  shell.echo('Some test data').to('.test/read-file.txt');
});

test.after(() => {
  shell.rm('-rf', '.test');
});

test('WriteFile should write to file on the given path', (t) => {
  const { fileHandler } = t.context;

  fileHandler.writeFileSync(
    'write-file.txt',
    shell.pwd() + '/.test',
    'some test data'
  );

  const path = '.test/write-file.txt';
  const result = shell.find(path);

  t.is(result[0], path);
});

test('WriteFile create the destination directory when it does not exists', (t) => {
  const { fileHandler } = t.context;

  fileHandler.writeFileSync(
    'write-file.txt',
    shell.pwd() + '/.test/write-destination',
    'some test data'
  );

  const path = '.test/write-destination/write-file.txt';
  const result = shell.find(path);

  t.is(result[0], path);
});

test('CopyFile should copy a file from source to the given destination', (t) => {
  const { fileHandler } = t.context;

  fileHandler.copyFileSync(
    'source-file.txt',
    shell.pwd() + '/.test',
    shell.pwd() + '/test/new-destination'
  );

  const result = shell.find('./test/new-destination/source-file.txt');

  t.is(result.length, 1);
});

test('CopyFile should raise an error when the source file does not exists', (t) => {
  const { fileHandler } = t.context;

  t.throws(() => {
    fileHandler.copyFileSync(
      'unknowfile.txt',
      shell.pwd() + '/.test',
      shell.pwd() + '/test/new-destination'
    );
  }, Error);
});

test('CopyFile should create the destination directory when it does not exists', (t) => {
  const { fileHandler } = t.context;

  fileHandler.copyFileSync(
    'source-file.txt',
    shell.pwd() + '/.test',
    shell.pwd() + '/test/other/destination'
  );

  const result = shell.find('./test/other/destination/source-file.txt');

  t.is(result.length, 1);
});

test('Readfile should return the content of the file', (t) => {
  const { fileHandler } = t.context;

  const result = fileHandler.readFileSync(
    'read-file.txt',
    shell.pwd() + '/.test'
  );

  t.is(result, 'Some test data\n');
});

test('ReadFile should raise an error when the file does not exists', (t) => {
  const { fileHandler } = t.context;

  t.throws(() => {
    fileHandler.readFileSync(
      'unknowfile.txt',
      shell.pwd() + '/.test'
    );
  }, Error);
});
