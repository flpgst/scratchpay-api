import { mockedTerm } from '../../mocks/term';
import { searchString } from './searchString';

describe('SearchString Filter', () => {
  it('should return the value of fullTerm given a term', () => {
    const result = searchString('string', mockedTerm);

    expect(result).toEqual(mockedTerm);
  });

  it('should return undefined if the given term not matches', () => {
    const result = searchString('NotMatch', mockedTerm);

    expect(result).toBeUndefined();
  });
});
