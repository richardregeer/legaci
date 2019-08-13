'use strict';

const fs = require('fs');
const shell = require('shelljs');
const program = require('commander');
const chalk = require('chalk');

const { version } = require('../package.json');

// Show ascii logo
console.log(chalk.green(shell.cat(shell.pwd() + '/assets/ascii-name.txt').toString()));

checkSystemDependencies();

program
  .version(version, '-v, --version')
  .command('legaci <file> <destination>', 'Extract installer and install to destination')
  .action(install);

function install(fileName, destination) {
  const extractDestination = getTempFolder();

  console.log(`Installation started for file ${fileName}`);

  extract(fileName, extractDestination);
  validateGOGDosBoxInstallationFile(fileName, extractDestination);

  copyExtracted(extractDestination, destination);

  createDosBoxConfig(destination);
  createStartupDosBoxConfig(destination);

  clearUpAfterInstall(extractDestination, destination);

  console.log(chalk.green(`Installation finished for ${fileName} to path ${destination}`));
}

function createDosBoxConfig(destination) {
  console.log(`Create new DosBox config file "legaci.conf" in ${destination}`);
  shell.cp(shell.pwd() + '/etc/dosbox/dosbox.template.conf', `${destination}/legaci.conf`);
}

function createStartupDosBoxConfig(destination) {
  console.log(`Create new startup DosBox config file "legaci-start.conf" in ${destination}`);

  // Try to find the GOG startup configuration
  const result = shell.find(`${destination}/*_single.conf`);

  if (result.length !== 1) {
    console.log(chalk.yellow('No GOG startup config found'));
    return;
  }

  // Cleanup and make it runable under Linux
  const startupConfig = fs.readFileSync(result[0]).toString().split('\r\n');
  const newStartupConfig = [];

  startupConfig.forEach((line) => {
    let newLine = line;

    // Replace mount with the correct Linux path
    if (line.toLowerCase().indexOf('mount c ".."') > -1) {
      newLine = newLine.replace('".."', destination);
    } else if (line.toLowerCase().indexOf('cloud_saves') > -1) {
      // skip this line from the config.
      newLine = '';
    } else if (line.toLowerCase().indexOf('[1;') > -1) {
      // skip this line from the config.
      newLine = '';
    } else if (line.toLowerCase().indexOf('[0m') > -1) {
      // skip this line from the config.
      newLine = '';
    } else if (line.toLowerCase().indexOf('imgmount') > -1) {
      // Replace image
      newLine = correctFilenameCase(destination, newLine);
      newLine = newLine.replace('..\\', `${destination}/`);
    }

    newStartupConfig.push(newLine.replace(/[^ -~]+/g, ''));
  });

  fs.writeFileSync(`${destination}/legaci-start.conf`, newStartupConfig.join('\n'));
}

function correctFilenameCase(destination, configLine) {
  const start = configLine.indexOf('\\');
  const end = configLine.indexOf('"', start);
  const fileName = configLine.substring(start + 1, end);

  if (fs.existsSync(destination + `/${fileName}`)) {
    return configLine;
  }

  let correctedFileName = fileName.toLowerCase();
  if (fs.existsSync(destination + `/${correctedFileName}`)) {
    return configLine.replace(fileName, correctedFileName);
  }

  correctedFileName = fileName.toUpperCase();
  if (fs.existsSync(destination + `/${correctedFileName}`)) {
    return configLine.replace(fileName, correctedFileName);
  }

  return configLine;
}

function getTempFolder() {
  const randomFolder = Math.random().toString(36).substring(2, 15);
  const tempFolder = `~/tmp/${randomFolder}`;

  if (!fs.existsSync(tempFolder)) {
    shell.mkdir('-p', tempFolder);
  }

  return tempFolder;
}

function copyExtracted(extractDestination, destination) {
  if (!fs.existsSync(destination)) {
    console.log(chalk.yellow(`Path ${destination} does not exists and will be created`));
    shell.mkdir('-p', destination);
  }

  console.log(`Move extracted game to ${destination}`);
  shell.mv(`${extractDestination}/drive_c/game/*`, destination);
}

function clearUpAfterInstall(extractDestination, destination) {
  console.log('Cleaning up temp files');
  shell.rm('-rf', extractDestination);

  console.log('Cleaning up unused files');
  shell.rm('-rf', `${destination}/DOSBOX`);
  shell.rm('-rf', `${destination}/cloud_saves`);
}

function extract(fileName, destination) {
  if (!fs.existsSync(fileName)) {
    console.log(chalk.red(`Cannot find file "${fileName}".`));
    shell.exit(1);
  }

  const command = `
        WINEPREFIX=${destination} WINEDLLOVERRIDES=winemenubuilder.exe=d \
        wine "${fileName}" \
        /NOGUI /SUPPRESSMSGBOXES /SILENT /DIR=C:\\game > /dev/null 2>&1`;

  console.log(`Extracting game files from ${fileName} using wine`);
  shell.exec(command);
}

function validateGOGDosBoxInstallationFile(fileName, destination) {
  let result = shell.find(destination + '/drive_c/game/goggame-*.info');

  if (result.length !== 1) {
    console.log(chalk.red(`File ${fileName} is not a valid GOG.com installation file`));
    shell.exit(1);
  }

  result = shell.find(destination + '/drive_c/game/DOSBOX/');

  if (result.length === 0) {
    console.log(chalk.red(`File ${fileName} is not a Dosbox installation file`));
    shell.exit(1);
  }
}

function checkSystemDependencies() {
  if (shell.exec('hash wine > /dev/null 2>&1').code > 0) {
    console.log(chalk.red('Wine is not installed on your system and is required.'));
    shell.exit(1);
  }

  if (shell.exec('hash dosbox > /dev/null 2>&1').code > 0) {
    console.log(chalk.red('Dosbox is not installed on your system and is required.'));
    shell.exit(1);
  }
}

program.parse(process.argv);
