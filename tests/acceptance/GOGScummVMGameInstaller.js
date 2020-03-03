/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');

const PACKAGE_PATH = '$(pwd)/assets/setup_larry3.exe';
const INSTALL_PATH = '~/legaci-test/games/larry3';

test.after(() => {
  shell.rm('-rf', '~/legaci-test');
});

test('Install GOG ScummVM  Windows installer with success using InnoExtract', (t) => {
  const command = `bin/legaci ${PACKAGE_PATH} ${INSTALL_PATH}`;
  shell.exec(command);

  t.true(shell.test('-e', INSTALL_PATH), `Game is not extracted to expected path ${INSTALL_PATH}`);
  t.true(shell.test('-e', `${INSTALL_PATH}/legaci-run.sh`), 'legaci-run.sh not found in extracted game path');
});
