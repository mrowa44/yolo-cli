const exec = require('child-process-promise').exec;
const findUp = require('find-up');

const CONFIG_NAME = 'yolo.json';

let config;

findUp(CONFIG_NAME)
  .then((path) => {
    config = require(path);
    console.log('Dropping');
    return exec(config.drop);
  })
  .then(() => {
    console.log('building');
    return exec(config.build);
  })
  .then(() => {
    console.log('post build');
    return exec(config.post);
  })
  .then(() => {
    console.log('success');
  });
