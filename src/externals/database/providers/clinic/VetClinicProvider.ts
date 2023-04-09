import { IClinic } from '@/types/entities/IClinic';
import { IVetClinic } from '@/types/entities/IVetClinic';
import { IFilters } from '@/types/IFilters';
import { IHttpClient } from '@/types/IHttpClient';
import { IVetClinicProvider } from '@/types/providers/IVetClinicProvider';
import { filterByQuery } from '../search-engine/filterByQuery';

export class VetClinicProvider implements IVetClinicProvider {
  constructor(private httpClient: IHttpClient, private url: string) {}

  async list(filters: IFilters): Promise<IClinic[]> {
    const vetClinics: IVetClinic[] = await this.httpClient.get(this.url);

    const clinics: IClinic[] = vetClinics.map((vetClinic) => ({
      name: vetClinic.clinicName,
      stateName: vetClinic.stateCode,
      availability: vetClinic.opening,
    }));

    return filterByQuery(filters, clinics);
  }
}
