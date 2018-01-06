jest.mock('find-up');

const childProcessPromise = require('child-process-promise');
const findUp = require('find-up');

const {
  buildDb,
  dropDb,
  migrateDb,
  yolo,
} = require('.');

const defaultSpinner = {
  color: 'pink',
  text: 'text',
};

describe('dropDb', () => {
  test('updates spinner accordingly', () => {
    const spinner = Object.assign({}, defaultSpinner);
    dropDb(spinner, 'echo');
    expect(spinner.color).toBe('red');
    expect(spinner.text).toMatch('Dropping');
  });

  test('executes drop command', () => {
    const spy = jest.spyOn(childProcessPromise, 'exec');
    const command = 'echo';
    return dropDb({}, command)
      .then(() => {
        expect(spy).toHaveBeenCalledWith(command);
      });
  });

  afterAll(() => {
    childProcessPromise.exec.mockRestore();
  });
});

describe('buildDb', () => {
  test('updates spinner accordingly', () => {
    const spinner = Object.assign({}, defaultSpinner);
    buildDb(spinner, 'echo');
    expect(spinner.color).toBe('yellow');
    expect(spinner.text).toMatch('Building');
  });

  test('executes build command', () => {
    const spy = jest.spyOn(childProcessPromise, 'exec');
    const command = 'echo';
    return buildDb({}, command)
      .then(() => {
        expect(spy).toHaveBeenCalledWith(command);
      });
  });

  afterAll(() => {
    childProcessPromise.exec.mockRestore();
  });
});

describe('migrateDb', () => {
  test('updates spinner accordingly', () => {
    const spinner = Object.assign({}, defaultSpinner);
    migrateDb(spinner, 'echo');
    expect(spinner.color).toBe('green');
    expect(spinner.text).toMatch('Migrating');
  });

  test('executes post command', () => {
    const spy = jest.spyOn(childProcessPromise, 'exec');
    const command = 'echo';
    return migrateDb({}, command)
      .then(() => {
        expect(spy).toHaveBeenCalledWith(command);
      });
  });

  afterAll(() => {
    childProcessPromise.exec.mockRestore();
  });
});

describe('yolo', () => {
  test('runs config commands', () => {
    const spy = jest.spyOn(childProcessPromise, 'exec');
    findUp.mockReturnValue(Promise.resolve('yolo.js'));
    return yolo()
      .then(() => {
        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenLastCalledWith('echo');
        findUp.mockReset();
      });
  });
});
