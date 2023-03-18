import { Clinic } from '@/types/entities';

export interface ClinicRepository {
  list(filters: any): Promise<Clinic[]>;
}
