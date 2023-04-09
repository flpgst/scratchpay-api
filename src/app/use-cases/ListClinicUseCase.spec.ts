import { mockedClinics } from '@/externals/database/mocks/clinics';
import { mockedFilters } from '@/externals/database/mocks/filters';
import { ClinicRepositoryProvider } from '@/externals/database/providers/clinic/ClinicRepositoryProvider';
import { DentalClinicProvider } from '@/externals/database/providers/clinic/DentalClinicProvider';
import { VetClinicProvider } from '@/externals/database/providers/clinic/VetClinicProvider';
import { InMemoryHttpClient } from '@/externals/http-client/InMemoryHttpClient';
import { ListClinicUseCase } from './ListClinicUseCase';

const httpClient = new InMemoryHttpClient();
const dentalClinicProvider = new DentalClinicProvider(httpClient, 'DENTAL_CLINICS');
const vetClinicProvider = new VetClinicProvider(httpClient, 'VET_CLINICS');
const repository = new ClinicRepositoryProvider(dentalClinicProvider, vetClinicProvider);
const listClinic = new ListClinicUseCase(repository);

describe('ListClinic UseCase', () => {
  it('should return a list of all clinics', async () => {
    const clinics = [...mockedClinics.DENTAL_CLINICS, ...mockedClinics.VET_CLINICS];

    const persistedClinics = await listClinic.execute({});

    expect(persistedClinics).toHaveLength(clinics.length);
  });

  it('should return a list of clinics filtered by name', async () => {
    const persistedClinics = await listClinic.execute({ name: mockedFilters.name });

    const regex = new RegExp(`\\${mockedFilters.name}\\.*`, 'i');

    persistedClinics.forEach((persistedClinic) => {
      expect(persistedClinic.name).toMatch(regex);
    });
  });

  it('should return a list of clinics filtered by state', async () => {
    const persistedClinics = await listClinic.execute({ state: mockedFilters.state });

    const regex = new RegExp(`\\${mockedFilters.state}\\.*`, 'i');

    persistedClinics.forEach((persistedClinic) => {
      expect(persistedClinic.stateName).toMatch(regex);
    });
  });

  it('should return a list of clinics filtered by time', async () => {
    const persistedClinics = await listClinic.execute({ time: mockedFilters.time });

    const timeHour = Number(mockedFilters.time!.split(':')[0]);

    persistedClinics.forEach((persistedClinic) => {
      const fromHour = Number(persistedClinic.availability.from.split(':')[0]);
      const toHour = Number(persistedClinic.availability.to.split(':')[0]);

      expect(timeHour).toBeGreaterThanOrEqual(fromHour);
      expect(timeHour).toBeLessThanOrEqual(toHour);
    });
  });

  it('should return a list of clinics filtered by all mockedFilters', async () => {
    const persistedClinics = await listClinic.execute(mockedFilters);

    const nameRegex = new RegExp(`\\${mockedFilters.name}\\.*`, 'i');
    const stateRegex = new RegExp(`\\${mockedFilters.state}\\.*`, 'i');

    const timeHour = Number(mockedFilters.time!.split(':')[0]);

    persistedClinics.forEach((persistedClinic) => {
      const fromHour = Number(persistedClinic.availability.from.split(':')[0]);
      const toHour = Number(persistedClinic.availability.to.split(':')[0]);

      expect(timeHour).toBeGreaterThanOrEqual(fromHour);
      expect(timeHour).toBeLessThanOrEqual(toHour);
      expect(persistedClinic.name).toMatch(nameRegex);
      expect(persistedClinic.stateName).toMatch(stateRegex);
    });
  });

  it('should throw an empty list if no clinics found', async () => {
    const persistedClinics = await listClinic.execute({ name: 'INVALID NAME' });

    expect(persistedClinics).toHaveLength(0);
  });
});
