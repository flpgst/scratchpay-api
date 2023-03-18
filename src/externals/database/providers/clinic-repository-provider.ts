import { ClinicRepository } from '@/types/repositories/Clinic';
import { DENTAL_CLINICS } from '@/externals/providers/scratchpay';
import { VET_CLINICS } from '@/externals/providers/scratchpay';
import { Clinic } from '@/types/entities';

export default class ClinicRepositoryProvider implements ClinicRepository {
  async list(filters: any): Promise<Clinic[]> {
    const dentalClinics: any = await (await fetch(DENTAL_CLINICS)).json();
    const vetClinics: any = await (await fetch(VET_CLINICS)).json();
    const clinicList = [...dentalClinics, ...vetClinics];

    return clinicList;
  }
}
