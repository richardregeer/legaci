import { version } from "../package.json";
import chalk from "chalk";
import * as shell from "shelljs";
import * as program from "commander";
import { Container } from "./Container";
import { CLICommandHandler } from "./infrastructure/cliController/CLICommandHandler";
import { LoggerInterface } from "./core/observability/LoggerInterface";

// Show ascii logo
console.log(
  chalk.green(shell.cat(shell.pwd() + "/assets/ascii-name.txt").toString())
);

// Run application
const container = new Container();
container.setup();
const cliCommandHandler = container.resolve<CLICommandHandler>(
  CLICommandHandler.name
);
const logger = container.resolve<LoggerInterface>("LoggerInterface");

program
  .version(version, "-v, --version")
  .command(
    "legaci <file> <destination>",
    "The game file to install on the given destination"
  )
  .option(
    "-g, --game-id <gameId>",
    "The legaci game identifier of the game to install"
  )
  .action((file, destination) =>
    cliCommandHandler.handleCLICommand(file, destination, program.gameId)
  );

try {
  (async () => program.parse(process.argv))();
} catch (error: any) {
  logger.error(`Error while installing game: ${error.message}`, error);
}
