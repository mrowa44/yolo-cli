'use strict';

const path = require('path');
const fs = require('fs');
const fsp = require('fs-promise');
const findUp = require('find-up');
const ora = require('ora');
const exec = require('child-process-promise').exec;

const CONFIG_NAME = 'yolo.js';

function initialize() {
  const spinner = ora().start();
  const configPath = `./${CONFIG_NAME}`;
  const examplePath = path.resolve(__dirname, `${CONFIG_NAME}.example`);

  spinner.text = 'Checking if file exists...';
  if (fs.existsSync(configPath)) {
    return spinner.fail(`${CONFIG_NAME} already exists!`);
  }

  spinner.text = `Creating ${CONFIG_NAME} file...`;
  return fsp.copy(examplePath, configPath)
    .then(() => spinner.succeed(`Created ${CONFIG_NAME}`))
    .catch(error => spinner.fail(error.message));
}

function dropDb(spinner, command) {
  spinner.color = 'red';
  spinner.text = 'Dropping database...';
  return exec(command);
}

function buildDb(spinner, command) {
  spinner.color = 'yellow';
  spinner.text = 'Building database...';
  return exec(command);
}

function migrateDb(spinner, command) {
  spinner.color = 'green';
  spinner.text = 'Migrating database...';
  return exec(command);
}

function yolo() {
  const spinner = ora('Preparing...').start();
  let config;

  return findUp(CONFIG_NAME)
    .then((configPath) => {
      config = require(configPath);
      return dropDb(spinner, config.drop);
    })
    .then(() => buildDb(spinner, config.build))
    .then(() => migrateDb(spinner, config.post))
    .then(() => spinner.succeed('Successfully dropped and created database!'))
    .catch(error => spinner.fail(error.message));
}

module.exports = {
  yolo,
  initialize,
};
