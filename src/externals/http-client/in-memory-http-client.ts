import { HttpClient } from '@/app/ports/http-client';
import { ClinicURL, mockedClinics } from '@/externals/database/mocks/clinics.mock';

class InMemoryHttpClient implements HttpClient {
  async get(url: ClinicURL): Promise<any> {
    return mockedClinics[url];
  }
}

export default InMemoryHttpClient;
