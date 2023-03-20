import { Clinic } from '@/types/entities';
import Filters from '../filters';

export interface ClinicProvider {
  list(filters: Filters): Promise<Clinic[]>;
}
