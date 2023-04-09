import { IClinic } from '@/types/entities/IClinic';
import { IFilters } from '@/types/IFilters';
import { checkAvailability } from './checkAvailability';
import { searchString } from './searchString';

type FilterBy = (filter: string, clinic: IClinic) => boolean;

const filterByName: FilterBy = (name, clinic) => {
  return Boolean(searchString(name, clinic.name));
};

const filterByState: FilterBy = (state, clinic) => {
  return Boolean(searchString(state, clinic.stateName));
};

const filterByTime: FilterBy = (time, clinic) => {
  return Boolean(checkAvailability(time, clinic.availability));
};

const filterStrategies: Record<string, Function> = {
  name: filterByName,
  state: filterByState,
  time: filterByTime,
};

export const filterByQuery = (filters: IFilters, clinics: IClinic[]): IClinic[] => {
  const filtersEntries = Object.keys(filters);

  return clinics.filter((clinic) => {
    return filtersEntries.every((key) => {
      return filterStrategies[key](filters[key as keyof IFilters], clinic);
    });
  });
};
