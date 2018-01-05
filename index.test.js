const childProcessPromise = require('child-process-promise');

const {
  dropDb,
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
        expect(spy).toHaveBeenCalled();
      });
  });
});
