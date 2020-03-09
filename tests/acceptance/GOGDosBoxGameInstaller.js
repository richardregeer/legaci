/* eslint-disable no-param-reassign */

'use strict';

const test = require('ava');
const shell = require('shelljs');

const INSTALL_PATH = '~/legaci-test/games/dosboxgame';

test.afterEach(() => {
  shell.rm('-rf', '~/legaci-test');
});

test('Install GOG DOSBox windows installer with success using InnoExtract', (t) => {
  const packagePath = '$(pwd)/assets/setup_tyrian.exe';

  const command = `bin/legaci ${packagePath} ${INSTALL_PATH}`;
  shell.exec(command);

  t.true(shell.test('-e', INSTALL_PATH), `Game is not extracted to expected path ${INSTALL_PATH}`);
  t.true(shell.test('-e', `${INSTALL_PATH}/legaci-start.conf`), 'legaci-start.conf not found in extracted game path');
  t.true(shell.test('-e', `${INSTALL_PATH}/legaci-run.sh`), 'legaci-run.sh not found in extracted game path');
});

test('Install GOG DOSBox linux shell installer with success using InnoExtract', (t) => {
  const packagePath = '$(pwd)/assets/jill_of_the_jungle.sh';

  const command = `bin/legaci ${packagePath} ${INSTALL_PATH}`;
  shell.exec(command);

  t.true(shell.test('-e', INSTALL_PATH), `Game is not extracted to expected path ${INSTALL_PATH}`);
  t.true(shell.test('-e', `${INSTALL_PATH}/legaci-start.conf`), 'legaci-start.conf not found in extracted game path');
  t.true(shell.test('-e', `${INSTALL_PATH}/legaci-run.sh`), 'legaci-run.sh not found in extracted game path');
});
