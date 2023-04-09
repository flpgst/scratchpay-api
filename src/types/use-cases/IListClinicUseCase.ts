import { IClinic } from '../entities/IClinic';
import { IFilters } from '../IFilters';

export interface IListClinicUseCase {
  execute(filters: IFilters): Promise<IClinic[]>;
}
