import { ClinicURL, mockedClinics } from '@/externals/database/mocks/clinics';
import { IHttpClient } from '@/types/IHttpClient';

export class InMemoryHttpClient implements IHttpClient {
  async get(url: ClinicURL): Promise<unknown> {
    return mockedClinics[url];
  }
}
