import { IAvailability } from '@/types/entities/IAvailability';
import { isWithinInterval } from 'date-fns';

const SEPARATOR = ':';

export const checkAvailability = (
  time: string,
  availability: IAvailability = { to: '', from: '' }
): boolean => {
  const [timeHour, timeMinute] = time.split(SEPARATOR);

  const [fromHour, fromMinute] = availability.from.split(SEPARATOR);
  const [toHour, toMinute] = availability.to.split(SEPARATOR);

  const timeDate = new Date().setHours(+timeHour, +timeMinute);

  const start = new Date().setHours(+fromHour, +fromMinute);
  const end = new Date().setHours(+toHour, +toMinute);

  return isWithinInterval(timeDate, {
    start,
    end,
  });
};
