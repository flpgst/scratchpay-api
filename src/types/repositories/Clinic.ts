import { Clinic } from '@/types/entities';
import Filters from '../filters';

export interface ClinicRepository {
  list(filters: Filters): Promise<Clinic[]>;
}
