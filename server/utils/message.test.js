const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

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

describe('Generate current location', () => {
  it('Should generate correct location object', () => {
    const from = 'Jacob do Bandolim';
    const coords = {
      latitude: -23.564,
      longitude: -46.654,
    }
    const url = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
    const message = generateLocationMessage(from, coords);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, url });
  })
});
