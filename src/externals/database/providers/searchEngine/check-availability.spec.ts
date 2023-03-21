import { Availability } from '@/types/entities';
import checkAvailability from './check-availability';

const availability: Availability = {
  from: '09:00',
  to: '20:00',
};

describe('CheckAvailability Filter', () => {
  it('should be true if given time is contained in availability', () => {
    const result = checkAvailability('11:20', availability);
    expect(result).toBeTruthy();
  });

  it('should be false if given time is not contained in availability', () => {
    const result = checkAvailability('21:00', availability);
    expect(result).toBeFalsy();
  });
});
