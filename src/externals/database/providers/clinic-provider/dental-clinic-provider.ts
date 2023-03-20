import { Availability, Clinic } from '@/types/entities';
import { HttpClient } from '@/app/ports/http-client';
import Filters from '@/types/filters';
import filterByQuery from '@/externals/database/providers/searchEngine';
import { ClinicProvider } from '@/types/providers/Clinic';

type DentalClinic = {
  name: string;
  stateName: string;
  availability: Availability;
};

export default class DentalClinicProvider implements ClinicProvider {
  constructor(private httpClient: HttpClient, private url: string) {}

  async list(filters: Filters): Promise<Clinic[]> {
    const dentalClinics: DentalClinic[] = await this.httpClient.get(this.url);
    const clinics: Clinic[] = dentalClinics.map(({ name, stateName, availability }) => ({
      name,
      stateName,
      availability,
    }));

    return filterByQuery(filters, clinics);
  }
}
