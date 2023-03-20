import { Clinic } from '@/types/entities';
import { ClinicProvider } from '@/types/providers/Clinic';
import { ClinicRepository } from '@/types/repositories/Clinic';
import Filters from '@/types/filters';

export default class ClinicRepositoryProvider implements ClinicRepository {
  constructor(
    private dentalClinicProvider: ClinicProvider,
    private vetClinicProvider: ClinicProvider
  ) {}

  async list(filters: Filters): Promise<Clinic[]> {
    const dentalClinics = await this.dentalClinicProvider.list(filters);
    const vetClinics = await this.vetClinicProvider.list(filters);

    return [...dentalClinics, ...vetClinics];
  }
}
