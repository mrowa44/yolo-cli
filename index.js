'use strict';

const exec = require('child-process-promise').exec;
const findUp = require('find-up');
const ora = require('ora');

const CONFIG_NAME = 'yolo.json';

module.exports = function run() {
  const spinner = ora('Preparing...').start();
  let config;

  findUp(CONFIG_NAME)
    .then((path) => {
      config = require(path);
      spinner.color = 'red';
      spinner.text = 'Dropping database...';
      return exec(config.drop);
    })
    .then(() => {
      spinner.color = 'yellow';
      spinner.text = 'Building database...';
      return exec(config.build);
    })
    .then(() => {
      spinner.color = 'green';
      spinner.text = 'Migrating database...';
      return exec(config.post);
    })
    .then(() => spinner.succeed('Successfully dropped and created database!'))
    .catch(error => spinner.fail(error.message));
};
