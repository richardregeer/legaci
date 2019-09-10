'use strict';

const shell = require('shelljs');
const program = require('commander');
const chalk = require('chalk');
const GameInstaller = require('./game/GameInstaller');
const ExtractorFactory = require('./extractor/ExtractorFactory');
const ConfigurationFactory = require('./configuration/ConfigurationFactory');
const FileHandler = require('./core/file/FileHandler');
const LoggingEvents = require('./logging/LoggingEvents');

const { version } = require('../package.json');

// Show ascii logo
console.log(chalk.green(shell.cat(shell.pwd() + '/assets/ascii-name.txt').toString()));

// checkSystemDependencies();

program
  .version(version, '-v, --version')
  .command('legaci <file> <destination>', 'Extract installer and install to destination')
  .action(install);

function install(fileName, destination) {
  const fileHandler = new FileHandler();
  const loggingEvents = new LoggingEvents();
  const extractorFactory = new ExtractorFactory(loggingEvents, '~/tmp', shell);
  const configurationFactory = new ConfigurationFactory(fileHandler, loggingEvents);
  const installer = new GameInstaller(
    extractorFactory,
    configurationFactory,
    fileHandler,
    loggingEvents,
    null
  );

  installer.install(fileName, destination);
}

program.parse(process.argv);
