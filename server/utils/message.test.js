const expect = require('expect');

const { generateMessage } = require('./message');

describe('Generate message', () => {
  it('Should generate correct message object', () => {
    const from = 'Jacob do Bandolim';
    const text = 'Some message';
    const message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    // expect(message).toStrictEqual({ from, text, createdAt: message.createdAt });
    expect(message).toMatchObject({ from, text });
  });
});
