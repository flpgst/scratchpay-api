import Filters from '@/types/filters';
import { mockedClinics, ClinicURL } from '@/externals/database/mocks/clinics.mock';
import filterByQuery from './filterByQuery';

const filters: Filters = {
  name: 'Good',
  state: 'Alaska',
  time: '09:00',
};

describe('FilterByQuery Filter', () => {
  it('should return the items of a list filtered by a query param', () => {
    const result = filterByQuery({ name: filters.name }, mockedClinics[ClinicURL.DENTAL_CLINICS]);
    result.every((clinic) => {
      expect(clinic.name).toMatch(`${filters.name}`);
    });
  });

  it('should return empty array if the given query param not matches', () => {
    const result = filterByQuery({ name: 'NotRealName' }, mockedClinics[ClinicURL.DENTAL_CLINICS]);
    expect(result).toHaveLength(0);
  });
});
