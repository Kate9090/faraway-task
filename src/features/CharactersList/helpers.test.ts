import { getId } from './helpers';

describe('CharactersListHelpers', () => {
  it('returns correct id from url', () => {
    const mockUrlOne = 'url/more/path/5/';
    const mockUrlTwo = 'url/more/path/10005/';

    expect(getId(mockUrlOne)).toBe('5');
    expect(getId(mockUrlTwo)).toBe('10005');
  });
});
