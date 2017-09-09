import { webworkerPromisify } from '../index';

describe('tests', () => {
  it('webworkerPromisify should return function', () => {
    expect(typeof webworkerPromisify(() => {})).toEqual('function');
  });
});
