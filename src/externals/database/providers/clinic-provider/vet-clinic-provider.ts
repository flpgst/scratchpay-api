import { ClinicRepository } from '@/types/repositories/Clinic';
import { VET_CLINICS } from '@/externals/providers/scratchpay';
import { Clinic } from '@/types/entities';
import { HttpClient } from '@/app/ports/http-client';
import filterByQuery from '../searchEngine';
import Filters from '@/types/filters';

interface Opening {
  from: string;
  to: string;
}

interface VetClinic {
  clinicName: string;
  stateCode: string;
  opening: Opening;
}

export default class VetClinicProvider implements ClinicRepository {
  constructor(private httpClient: HttpClient) {}

  async list(filters: Filters): Promise<Clinic[]> {
    const vetClinics: VetClinic[] = await this.httpClient.get(VET_CLINICS);

    const clinics: Clinic[] = vetClinics.map((vetClinic) => ({
      name: vetClinic.clinicName,
      availability: vetClinic.opening,
      stateName: vetClinic.stateCode,
    }));

    return filterByQuery(filters, clinics);
  }
}
