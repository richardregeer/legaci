import { version } from '../package.json';
import chalk from 'chalk';
import * as shell from 'shelljs';
import * as program from 'commander';
import { Container } from './Container';
import { CLICommandHandler } from './infrastructure/cliController/CLICommandHandler';

// Show ascii logo
console.log(chalk.green(shell.cat(shell.pwd() + '/assets/ascii-name.txt').toString()));

// Run application
const container = new Container();
container.setup();
const cliCommandHandler = container.resolve<CLICommandHandler>(CLICommandHandler.name);

program
  .version(version, '-v, --version')
  .option('-d, --default <useDefaultConfig>', 'Install game with default configuratation')
  .command('legaci <file> <destination>', 'Extract installer and install to destination')
  .action(cliCommandHandler.handleCLICommand);

try {
  program.parse(process.argv);
} catch (error) {
  console.log(chalk.red(`Error in installing game file: ${error.message}`));
}
