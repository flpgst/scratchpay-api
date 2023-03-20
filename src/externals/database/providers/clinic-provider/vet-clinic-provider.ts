import { Clinic } from '@/types/entities';
import { HttpClient } from '@/app/ports/http-client';
import filterByQuery from '../searchEngine';
import Filters from '@/types/filters';
import { ClinicProvider } from '@/types/providers/Clinic';

interface Opening {
  from: string;
  to: string;
}

interface VetClinic {
  clinicName: string;
  stateCode: string;
  opening: Opening;
}

export default class VetClinicProvider implements ClinicProvider {
  constructor(private httpClient: HttpClient, private url: string) {}

  async list(filters: Filters): Promise<Clinic[]> {
    const vetClinics: VetClinic[] = await this.httpClient.get(this.url);

    const clinics: Clinic[] = vetClinics.map((vetClinic) => ({
      name: vetClinic.clinicName,
      availability: vetClinic.opening,
      stateName: vetClinic.stateCode,
    }));

    return filterByQuery(filters, clinics);
  }
}
