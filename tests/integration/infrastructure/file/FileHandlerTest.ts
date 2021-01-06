import anyTest, { ExecutionContext, TestInterface } from 'ava';
import { assert } from 'chai';
import * as shell from 'shelljs';
import sinon, { StubbedInstance, stubInterface } from 'ts-sinon';
import { FileHandlerInterface } from '../../../../src/core/file/FileHandlerInterface';
import { FileHandler } from '../../../../src/infrastructure/file/FileHandler';

interface Context {
  sut: FileHandlerInterface;
  sandbox: sinon.SinonSandbox;
}

const test = anyTest;

test.beforeEach((t: ExecutionContext<Context>) => {
  shell.config.silent = true;
  t.context.sandbox = sinon.createSandbox();
  t.context.sut = new FileHandler(shell.config);

  shell.mkdir('-p', '.test/new-destination');
  shell.touch('.test/source-file1.txt');
  shell.touch('.test/source-file2.txt');
  shell.touch('.test/source-file3.txt');
  // shell.echo('Some test data').to('.test/read-file.txt');
});

test.afterEach((t: ExecutionContext<Context>) => {
  t.context.sandbox.reset();
  shell.config.silent = false;
  shell.rm('-rf', shell.pwd() + '/.test');
});

test('removeFilesSync should remove given files', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;

  sut.removeFilesSync(shell.pwd() + '/.test/*.txt');

  const result = shell.find(shell.pwd() + '/.test/*.txt');
  assert.strictEqual(result.code, 0);
});

test('findFileSync should find the files by the given glob', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;

  const result = sut.findFilesSync(false, shell.pwd() + '/.test/', '*.txt');

  assert.lengthOf(result, 3);
});

test('findFileSync should find the files by the given glob and ignore casing', async (t: ExecutionContext<Context>) => {
  const { sut } = t.context;

  shell.touch('.test/SOURCE-file4.TXT');
  shell.touch('.test/SOURCE-file5.txt');

  const result = sut.findFilesSync(true, shell.pwd() + '/.test/', '*.TXT');

  console.log(result);

  assert.lengthOf(result, 5);
});

// test('WriteFile should write to file on the given path', (t) => {
//   const { fileHandler } = t.context;

//   fileHandler.writeFileSync(shell.pwd() + '/.test/write-file.txt', 'some test data');

//   const path = '.test/write-file.txt';
//   const result = shell.find(path);

//   t.is(result[0], path);
// });

// test('WriteFile create the destination directory when it does not exists', (t) => {
//   const { fileHandler } = t.context;

//   fileHandler.writeFileSync(shell.pwd() + '/.test/write-destination/write-file.txt', 'some test data');

//   const path = '.test/write-destination/write-file.txt';
//   const result = shell.find(path);

//   t.is(result[0], path);
// });

// test('CopyFile should copy a file from source to the given destination', (t) => {
//   const { fileHandler } = t.context;

//   fileHandler.copyFileSync(shell.pwd() + '/.test/source-file.txt', shell.pwd() + '/.test/new-destination/source-file.txt');

//   const result = shell.find('.test/new-destination/source-file.txt');

//   t.is(result.length, 1);
// });

// test('CopyFile should raise an error when the source file does not exists', (t) => {
//   const { fileHandler } = t.context;

//   t.throws(() => {
//     fileHandler.copyFileSync(shell.pwd() + '/.test/unknowfile.txt', shell.pwd() + '/.test/new-destination/unknowfile.txt');
//   }, Error);
// });

// test('CopyFile should create the destination directory when it does not exists', (t) => {
//   const { fileHandler } = t.context;

//   fileHandler.copyFileSync(shell.pwd() + '/.test/source-file.txt', shell.pwd() + '/.test/other/destination/source-file.txt');

//   const result = shell.find('.test/other/destination/source-file.txt');

//   t.is(result.length, 1);
// });

// test('Readfile should return the content of the file', (t) => {
//   const { fileHandler } = t.context;

//   const result = fileHandler.readFileSync(shell.pwd() + '/.test/read-file.txt');

//   t.is(result, 'Some test data\n');
// });

// test('ReadFile should raise an error when the file does not exists', (t) => {
//   const { fileHandler } = t.context;

//   t.throws(() => {
//     fileHandler.readFileSync(shell.pwd() + '/.test/unknowfile.txt');
//   }, Error);
// });
