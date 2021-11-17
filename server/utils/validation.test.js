const expect = require('expect');

const { isString } = require('../utils/isString');

describe('Check if param is a string', () => {
  it('should return true if param is a string', () => {
    expect(isString('test')).toBe(true);
  });

  it('should return false if param is not a string', () => {
    expect(isString(123)).toBe(false);
  });

  it('should allow strings with non-space chars.', () => {
    expect(isString('  test    string   ')).toBe(true);
  });

  
})