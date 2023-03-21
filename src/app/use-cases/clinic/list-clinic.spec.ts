import DentalClinicProvider from '@/externals/database/providers/clinic-provider/dental-clinic-provider';
import ClinicRepositoryProvider from '@/externals/database/providers/clinic-provider/clinic-repository-provider';
import VetClinicProvider from '@/externals/database/providers/clinic-provider/vet-clinic-provider';
import InMemoryHttpClient from '@/externals/http-client/in-memory-http-client';
import ListClinic from './list-clinic';
import Filters from '@/types/filters';
import { mockedClinics } from '@/externals/database/mocks/clinics.mock';

const httpClient = new InMemoryHttpClient();
const dentalClinicProvider = new DentalClinicProvider(httpClient, 'DENTAL_CLINICS');
const vetClinicProvider = new VetClinicProvider(httpClient, 'VET_CLINICS');
const repository = new ClinicRepositoryProvider(dentalClinicProvider, vetClinicProvider);
const listClinic = new ListClinic(repository);

const filters: Filters = {
  name: 'Good',
  state: 'Alaska',
  time: '09:00',
};

describe('ListClinic UseCase', () => {
  it('should return a list of all clinics', async () => {
    const clinics = [...mockedClinics.DENTAL_CLINICS, ...mockedClinics.VET_CLINICS];
    const persistedClinics = await listClinic.execute({});
    expect(persistedClinics).toHaveLength(clinics.length);
  });

  it('should return a list of clinics filtered by name', async () => {
    const persistedClinics = await listClinic.execute({ name: filters.name });
    const regex = new RegExp(`\\${filters.name}\\.*`, 'i');

    persistedClinics.forEach((persistedClinic) => {
      expect(persistedClinic?.name).toMatch(regex);
    });
  });

  it('should return a list of clinics filtered by state', async () => {
    const persistedClinics = await listClinic.execute({ state: filters.state });
    const regex = new RegExp(`\\${filters.state}\\.*`, 'i');

    persistedClinics.forEach((persistedClinic) => {
      expect(persistedClinic?.stateName).toMatch(regex);
    });
  });

  it('should return a list of clinics filtered by time', async () => {
    const persistedClinics = await listClinic.execute({ time: filters.time });
    const timeHour = Number(filters.time!.split(':')[0]);

    persistedClinics.forEach((persistedClinic) => {
      const fromHour = Number(persistedClinic?.availability.from.split(':')[0]);
      const toHour = Number(persistedClinic?.availability.to.split(':')[0]);

      expect(timeHour).toBeGreaterThanOrEqual(fromHour);
      expect(timeHour).toBeLessThanOrEqual(toHour);
    });
  });

  it('should return a list of clinics filtered by all filters', async () => {
    const persistedClinics = await listClinic.execute(filters);
    const nameRegex = new RegExp(`\\${filters.name}\\.*`, 'i');
    const stateRegex = new RegExp(`\\${filters.state}\\.*`, 'i');
    const timeHour = Number(filters.time!.split(':')[0]);

    persistedClinics.forEach((persistedClinic) => {
      const fromHour = Number(persistedClinic?.availability.from.split(':')[0]);
      const toHour = Number(persistedClinic?.availability.to.split(':')[0]);

      expect(timeHour).toBeGreaterThanOrEqual(fromHour);
      expect(timeHour).toBeLessThanOrEqual(toHour);
      expect(persistedClinic?.name).toMatch(nameRegex);
      expect(persistedClinic?.stateName).toMatch(stateRegex);
    });
  });

  it('should throw an empty list if no clinics found', async () => {
    const persistedClinics = await listClinic.execute({ name: 'INVALID NAME' });

    expect(persistedClinics).toHaveLength(0);
  });
});
