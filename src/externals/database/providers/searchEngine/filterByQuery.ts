import { Clinic } from '@/types/entities';
import Filters from '@/types/filters';
import checkAvailability from './check-availability';
import searchString from './search-string';

const filterByName = (name: string, clinic: Clinic) => {
  return Boolean(searchString(name, clinic.name));
};

const filterByState = (state: string, clinic: Clinic) => {
  return Boolean(searchString(state, clinic.stateName));
};

const filterByTime = (time: string, clinic: Clinic) => {
  return Boolean(checkAvailability(time, clinic.availability));
};

const filterStrategies: Record<string, Function> = {
  name: filterByName,
  state: filterByState,
  time: filterByTime,
};

const filterByQuery = (filters: Filters, clinicList: Clinic[]): Clinic[] => {
  const filtersEntries = Object.keys(filters);

  return clinicList.filter((clinic) => {
    return filtersEntries.every((key) => {
      return filterStrategies[key](filters[key as keyof Filters], clinic);
    });
  });
};

export default filterByQuery;
