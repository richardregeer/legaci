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
  .command('legaci <gameId> <file> <destination>', 'Extract installer and install to destination')
  .action((gameId, file, destination) => cliCommandHandler.handleCLICommand(gameId, file, destination));

try {
  program.parse(process.argv);
} catch (error) {
  console.log(chalk.red(`Error in installing game file: ${error.message}`));
}
