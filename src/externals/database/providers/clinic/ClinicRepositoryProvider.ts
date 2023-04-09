import { IClinic } from '@/types/entities/IClinic';
import { IFilters } from '@/types/IFilters';
import { IDentalClinicProvider } from '@/types/providers/IDentalClinicProvider';
import { IVetClinicProvider } from '@/types/providers/IVetClinicProvider';
import { IClinicRepository } from '@/types/repositories/IClinicRepository';

export class ClinicRepositoryProvider implements IClinicRepository {
  constructor(
    private dentalClinicProvider: IDentalClinicProvider,
    private vetClinicProvider: IVetClinicProvider
  ) {}

  async list(filters: IFilters): Promise<IClinic[]> {
    const dentalClinics = await this.dentalClinicProvider.list(filters);

    const vetClinics = await this.vetClinicProvider.list(filters);

    return [...dentalClinics, ...vetClinics];
  }
}
