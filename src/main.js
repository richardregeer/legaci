'use strict';

const shell = require('shelljs');
const program = require('commander');
const chalk = require('chalk');
const GameInstaller = require('./game/GameInstaller');
const ConfigurationFactory = require('./configuration/ConfigurationFactory');
const FileHandler = require('./core/file/FileHandler');
const LoggerFactory = require('./logging/LoggerFactory');
const SoftwareDependency = require('./core/system/SoftwareDependency');
const PackageTypeResolver = require('./game/package/PackageTypeResolver');
const WineExtractor = require('./extractor/WineExtractor');
const InnoExtractExtractor = require('./extractor/InnoExtractExtractor');
const TemplateFactory = require('./core/file/TemplateFactory');
const DosBoxGameRunner = require('./runner/DosBoxGameRunner');

const { version } = require('../package.json');

// Show ascii logo
console.log(chalk.green(shell.cat(shell.pwd() + '/assets/ascii-name.txt').toString()));

// Check required system depencies
if (!SoftwareDependency.isDosBoxAvailable()) {
  console.log(chalk.red('Dosbox is not installed on your system and is required'));
  shell.exit(1);
}

// if (!SoftwareDependency.isWineAvailable()) {
//   console.log(chalk.red('Wine is not installed on your system and is required'));
//   shell.exit(1);
// }

if (!SoftwareDependency.isInnoExtractAvailable()) {
  console.log(chalk.red('Innoextract is not installed on your system and is required'));
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
  // const extractor = new WineExtractor(logger, '~/tmp', shell);
  const extractor = new InnoExtractExtractor(logger, '~/tmp', shell);
  const configurationFactory = new ConfigurationFactory(fileHandler, logger, shell);
  const packageTypeResolver = new PackageTypeResolver(shell);
  const templateFactory = new TemplateFactory(fileHandler, logger);
  const gameRunner = new DosBoxGameRunner(fileHandler, logger, shell);
  const installer = new GameInstaller(
    extractor,
    configurationFactory,
    fileHandler,
    logger,
    packageTypeResolver,
    templateFactory,
    gameRunner
  );

  installer.install(fileName, destination);
}

program.parse(process.argv);
