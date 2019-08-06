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
    clearUpAfterInstall(extractDestination);

    console.log(chalk.green(`Installation finished for ${fileName} to path ${destination}`));
}

function getTempFolder() {
    const randomFolder = Math.random().toString(36).substring(2, 15);
    const tempFolder = `~/tmp/${randomFolder}`;

    if (!fs.existsSync(tempFolder)) {
        shell.mkdir('-p', tempFolder)
    }

    return tempFolder
}

function copyExtracted(extractDestination, destination) {
    if (!fs.existsSync(destination)) {
        console.log(chalk.yellow(`Path ${destination} does not exists and will be created`));
        shell.mkdir('-p', destination);
    }

    console.log(`Move extracted game to ${destination}`);
    shell.mv(`${extractDestination}/drive_c/game/*`, destination);
}

function clearUpAfterInstall(destination) {
    console.log(`Cleaning up temp files`);
    shell.rm('-rf', destination);
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

    if (result.length === 0 ) {
        console.log(chalk.red(`File ${fileName} is not a Dosbox installation file`));
        shell.exit(1);
    }
}

function checkSystemDependencies() {
    if (shell.exec('hash wine > /dev/null 2>&1').code > 0) {
        console.log(chalk.red('Wine is not installed on your system and is required.'));
        shell.exit(1);
    };

    if (shell.exec('hash dosbox > /dev/null 2>&1').code > 0) {
        console.log(chalk.red('Dosbox is not installed on your system and is required.'));
        shell.exit(1);
    };
}

program.parse(process.argv);
