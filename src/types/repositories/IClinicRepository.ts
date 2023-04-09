import { IClinic } from '../entities/IClinic';
import { IFilters } from '../IFilters';

export interface IClinicRepository {
  list(filters: IFilters): Promise<IClinic[]>;
}
