import { mockedAvailability } from '../../mocks/availability';
import { checkAvailability } from './checkAvailability';

describe('CheckAvailability Filter', () => {
  it('should be true if given time is contained in availability', () => {
    const result = checkAvailability('11:20', mockedAvailability);

    expect(result).toBeTruthy();
  });

  it('should be false if given time is not contained in availability', () => {
    const result = checkAvailability('21:00', mockedAvailability);

    expect(result).toBeFalsy();
  });
});
