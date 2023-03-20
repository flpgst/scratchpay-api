import { ClinicRepository } from '@/types/repositories/Clinic';
import { Clinic } from '@/types/entities';
import Filters from '@/types/filters';

export default class ClinicRepositoryProvider implements ClinicRepository {
  constructor(
    private dentalClinicProvider: ClinicRepository,
    private vetClinicProvider: ClinicRepository
  ) {}

  async list(filters: Filters): Promise<Clinic[]> {
    const dentalClinics = await this.dentalClinicProvider.list(filters);
    const vetClinics = await this.vetClinicProvider.list(filters);

    return [...dentalClinics, ...vetClinics];
  }
}
