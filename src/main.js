'use strict';

const shell = require('shelljs');
const program = require('commander');
const chalk = require('chalk');

const GameInstaller = require('./game/GameInstaller');
const GameExtractor = require('./game/GameExtractor');
const ConfigurationFactory = require('./configuration/ConfigurationFactory');
const FileHandler = require('./core/file/FileHandler');
const LoggerFactory = require('./logging/LoggerFactory');
const SoftwareDependency = require('./core/system/SoftwareDependency');
const PackageTypeResolver = require('./game/package/PackageTypeResolver');
const FileTypeResolver = require('./core/file/FileTypeResolver');
const ExtractorFactory = require('./extractor/ExtractorFactory');
const TemplateFactory = require('./core/file/TemplateFactory');
const GameRunnerFactory = require('./runner/GameRunnerFactory');
const ShellScriptRunner = require('./runner/ShellScriptRunner');
const fileTypes = require('./core/file/fileTypes');
const extractorTypes = require('./extractor/extractorTypes');
const InstallerFactory = require('./game/installer/InstallerFactory');

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
  .option('-x, --extractor <type>', 'Force to use an extractor [wine|innoextract|unzip|auto]', parseExtractorType)
  .command('legaci <file> <destination>', 'Extract installer and install to destination')
  .action(install);

function install(fileName, destination) {
  const fileHandler = new FileHandler();
  const logger = new LoggerFactory().createLogger();
  const extractorFactory = new ExtractorFactory(logger, '~/tmp', shell);
  const configurationFactory = new ConfigurationFactory(fileHandler, logger, shell);
  const packageTypeResolver = new PackageTypeResolver(shell);
  const fileTypeResolver = new FileTypeResolver(shell);
  const templateFactory = new TemplateFactory(fileHandler, logger);
  const gameRunnerFactory = new GameRunnerFactory(logger, fileHandler, shell);
  const shellScriptRunner = new ShellScriptRunner(logger, shell);

  const installerFactory = new InstallerFactory(
    configurationFactory,
    fileHandler,
    templateFactory,
    gameRunnerFactory,
    shell
  );

  const gameExtractor = new GameExtractor(
    extractorFactory,
    fileTypeResolver,
    logger
  );

  const gameInstaller = new GameInstaller(
    logger,
    installerFactory,
    packageTypeResolver
  );

  const fileType = fileTypeResolver.getFileType(fileName);

  // Extract and install the game package
  if (fileType === fileTypes.SH) {
    shellScriptRunner.run(fileName);
  } else {
    gameExtractor.extract(fileName, destination, program.extractor);
    gameInstaller.install(fileName, destination);
  }
}

function parseExtractorType(type) {
  switch (type) {
    case 'wine': return extractorTypes.WINE;
    case 'innoextract': return extractorTypes.INNOEXTRACT;
    case 'unzip': return extractorTypes.UNZIP;
    case 'auto': // Auto resolve the correct extractor
    default: return extractorTypes.UNKNOWN;
  }
}

// try {
program.parse(process.argv);
// } catch (error) {
//   console.log(chalk.red(`Error in installing game file: ${error.message}`));
// }
