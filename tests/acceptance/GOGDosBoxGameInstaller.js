/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');

const PACKAGE_PATH = '$(pwd)/assets/setup_tyrian.exe';
const INSTALL_PATH = '~/legaci-test/games/tyrian';

test.after(() => {
  shell.rm('-rf', '~/legaci-test');
});

test('Install GOG DOSBox windows installer with success using Wine', (t) => {
  const command = `bin/legaci ${PACKAGE_PATH} ${INSTALL_PATH}`;
  shell.exec(command);

  t.true(shell.test('-e', INSTALL_PATH), `Game is not extracted to expected path ${INSTALL_PATH}`);
  t.true(shell.test('-e', `${INSTALL_PATH}/legaci.conf`), 'Legaci.conf not found in extracted game');
  t.true(shell.test('-e', `${INSTALL_PATH}/legaci-start.conf`), 'Legaci-start.conf not found in extracted game');
});
