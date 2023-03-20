import { ClinicRepository } from '@/types/repositories/Clinic';
import { DENTAL_CLINICS } from '@/externals/providers/scratchpay';
import { Availability, Clinic } from '@/types/entities';
import { HttpClient } from '@/app/ports/http-client';
import Filters from '@/types/filters';
import filterByQuery from '../searchEngine';

type DentalClinic = {
  name: string;
  stateName: string;
  availability: Availability;
};

export default class DentalClinicProvider implements ClinicRepository {
  constructor(private httpClient: HttpClient) {}

  async list(filters: Filters): Promise<Clinic[]> {
    const dentalClinics: DentalClinic[] = await this.httpClient.get(DENTAL_CLINICS);
    const clinics: Clinic[] = dentalClinics.map(({ name, stateName, availability }) => ({
      name,
      stateName,
      availability,
    }));

    return filterByQuery(filters, clinics);
  }
}
