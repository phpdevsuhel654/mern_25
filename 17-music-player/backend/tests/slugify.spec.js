const slugify = require('../src/utils/slugify');

describe('slugify', () => {
  it('normalizes whitespace and symbols', () => {
    expect(slugify('  Hello, Music Player!  ')).toBe('hello-music-player');
  });

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('');
    expect(slugify(null)).toBe('');
  });
});
