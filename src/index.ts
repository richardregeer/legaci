import { version } from '../package.json';
import chalk from 'chalk';
import * as shell from 'shelljs';
import * as program from 'commander';
import { Container } from './Container';
import { CLICommandHandler } from './infrastructure/cliController/CLICommandHandler';
import { LoggerInterface } from './core/observability/LoggerInterface';

// Show ascii logo
console.log(chalk.green(shell.cat(shell.pwd() + '/assets/ascii-name.txt').toString()));

// Run application
const container = new Container();
container.setup();
const cliCommandHandler = container.resolve<CLICommandHandler>(CLICommandHandler.name);
const logger = container.resolve<LoggerInterface>('LoggerInterface');

program
  .version(version, '-v, --version')
  .command('legaci <gameId> <file> <destination>', 'Extract installer and install to destination')
  .action((gameId, file, destination) => cliCommandHandler.handleCLICommand(gameId, file, destination));

try {
  (async()=> await program.parse(process.argv))();
} catch (error: any) {
  logger.error(`Error while installing game: ${error.message}`, error);
}
