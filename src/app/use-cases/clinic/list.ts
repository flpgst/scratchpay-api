import { Clinic } from '@/types/entities';
import { ClinicRepository } from '@/types/repositories/Clinic';
import { NotFoundError } from '@/common/errors';

export default class ListClinic {
  static async execute(filters: any, clinicRepository: ClinicRepository): Promise<Clinic[]> {
    console.log('use-case :>> ');
    const clinicList = await clinicRepository.list(filters);

    if (!clinicList) {
      throw new NotFoundError({ message: 'No clinics found' });
    }

    return clinicList;
  }
}
