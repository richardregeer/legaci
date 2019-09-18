'use strict';

const shell = require('shelljs');
const program = require('commander');
const chalk = require('chalk');
const GameInstaller = require('./game/GameInstaller');
const ExtractorFactory = require('./extractor/ExtractorFactory');
const ConfigurationFactory = require('./configuration/ConfigurationFactory');
const FileHandler = require('./core/file/FileHandler');
const LoggerFactory = require('./logging/LoggerFactory');
const SoftwareDependency = require('./core/system/SoftwareDependency');
const PackageTypeResolver = require('./game/package/PackageTypeResolver');

const { version } = require('../package.json');

// Show ascii logo
console.log(chalk.green(shell.cat(shell.pwd() + '/assets/ascii-name.txt').toString()));

// Check required system depencies
if (!SoftwareDependency.isDosBoxAvailable()) {
  console.log(chalk.red('Dosbox is not installed on your system and is required'));
  shell.exit(1);
}

if (!SoftwareDependency.isWineAvailable()) {
  console.log(chalk.red('Wine is not installed on your system and is required'));
  shell.exit(1);
}

// Run application
program
  .version(version, '-v, --version')
  .command('legaci <file> <destination>', 'Extract installer and install to destination')
  .action(install);

function install(fileName, destination) {
  const fileHandler = new FileHandler();
  const logger = new LoggerFactory().createLogger();
  const extractorFactory = new ExtractorFactory(logger, '~/tmp', shell);
  const configurationFactory = new ConfigurationFactory(fileHandler, logger);
  const packageTypeResolver = new PackageTypeResolver();
  const installer = new GameInstaller(
    extractorFactory,
    configurationFactory,
    fileHandler,
    logger,
    packageTypeResolver
  );

  installer.install(fileName, destination);
}

program.parse(process.argv);
