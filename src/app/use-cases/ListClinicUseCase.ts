import { IClinic } from '@/types/entities/IClinic';
import { IFilters } from '@/types/IFilters';
import { IClinicRepository } from '@/types/repositories/IClinicRepository';
import { IListClinicUseCase } from '@/types/use-cases/IListClinicUseCase';

export class ListClinicUseCase implements IListClinicUseCase {
  constructor(private clinicRepository: IClinicRepository) {}

  async execute(filters: IFilters): Promise<IClinic[]> {
    const clinicList = await this.clinicRepository.list(filters);

    return clinicList || [];
  }
}
