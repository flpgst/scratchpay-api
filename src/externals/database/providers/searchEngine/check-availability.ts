import { Availability } from '@/types/entities';
import { isWithinInterval } from 'date-fns';

const checkAvailability = (
  time?: string,
  availability: Availability = { to: '', from: '' }
): boolean => {
  if (!time) return false;
  const [fromHour, fromMinute] = availability.from.split(':');
  const [toHour, toMinute] = availability.to.split(':');
  const [timeHour, timeMinute] = time.split(':');

  const start = new Date().setHours(+fromHour, +fromMinute);
  const end = new Date().setHours(+toHour, +toMinute);
  const timeDate = new Date().setHours(+timeHour, +timeMinute);

  return isWithinInterval(timeDate, {
    start,
    end,
  });
};

export default checkAvailability;
