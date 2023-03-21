import searchString from './search-string';

const fullTerm = 'This is the string to be matched';

describe('SearchString Filter', () => {
  it('should return the value of fullTerm given a term', () => {
    const result = searchString('string', fullTerm);
    expect(result).toEqual(fullTerm);
  });

  it('should return undefined if the given term not matches', () => {
    const result = searchString('NotMatch', fullTerm);
    expect(result).toBeUndefined();
  });
});
