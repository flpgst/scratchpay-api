import { Clinic } from '@/types/entities';
import { ClinicRepository } from '@/types/repositories/Clinic';
import Filters from '@/types/filters';

export default class ListClinic {
  constructor(private clinicRepository: ClinicRepository) {}

  async execute(filters: Filters): Promise<Array<Clinic | undefined>> {
    const clinicList = await this.clinicRepository.list(filters);

    return clinicList;
  }
}
