import { ClinicURL, mockedClinics } from '../../mocks/clinics';
import { mockedFilters } from '../../mocks/filters';
import { filterByQuery } from './filterByQuery';

describe('FilterByQuery Filter', () => {
  it('should return the items of a list filtered by a query param', () => {
    const result = filterByQuery(
      { name: mockedFilters.name },
      mockedClinics[ClinicURL.DENTAL_CLINICS]
    );

    result.every((clinic) => {
      expect(clinic.name).toMatch(`${mockedFilters.name}`);
    });
  });

  it('should return empty array if the given query param not matches', () => {
    const result = filterByQuery({ name: 'NotRealName' }, mockedClinics[ClinicURL.DENTAL_CLINICS]);

    expect(result).toHaveLength(0);
  });
});
