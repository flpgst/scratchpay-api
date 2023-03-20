import { Clinic } from '@/types/entities';
import { ClinicRepository } from '@/types/repositories/Clinic';
import { NotFoundError } from '@/common/errors';
import Filters from '@/types/filters';

export default class ListClinic {
  constructor(private clinicRepository: ClinicRepository) {}

  async execute(filters: Filters): Promise<Array<Clinic | undefined>> {
    const clinicList = await this.clinicRepository.list(filters);

    if (!clinicList) {
      throw new NotFoundError({ message: 'No clinics found' });
    }

    return clinicList;
  }
}
