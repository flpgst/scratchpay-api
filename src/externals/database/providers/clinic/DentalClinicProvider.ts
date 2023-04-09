import { IClinic } from '@/types/entities/IClinic';
import { IDentalClinic } from '@/types/entities/IDentalClinic';
import { IFilters } from '@/types/IFilters';
import { IHttpClient } from '@/types/IHttpClient';
import { IDentalClinicProvider } from '@/types/providers/IDentalClinicProvider';
import { filterByQuery } from '../search-engine/filterByQuery';

export class DentalClinicProvider implements IDentalClinicProvider {
  constructor(private httpClient: IHttpClient, private url: string) {}

  async list(filters: IFilters): Promise<IClinic[]> {
    const dentalClinics: IDentalClinic[] = await this.httpClient.get(this.url);

    const clinics: IClinic[] = dentalClinics.map(({ name, stateName, availability }) => ({
      name,
      stateName,
      availability,
    }));

    return filterByQuery(filters, clinics);
  }
}
