import { IClinic } from '../entities/IClinic';
import { IFilters } from '../IFilters';

export interface IClinicProvider {
  list(filters: IFilters): Promise<IClinic[]>;
}
