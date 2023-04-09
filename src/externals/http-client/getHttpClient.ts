import { FetchHttpClient } from '@/externals/http-client/FetchHttpClient';
import { InMemoryHttpClient } from '@/externals/http-client/InMemoryHttpClient';
import { IHttpClient } from '@/types/IHttpClient';
import { DENTAL_CLINICS_URL, VET_CLINICS_URL } from '../providers/scratchpay';

export function getHttpClient(): [IHttpClient, { dental: string; vet: string }] {
  if (process.env.NODE_ENV === 'test') {
    return [new InMemoryHttpClient(), { dental: 'DENTAL_CLINICS', vet: 'VET_CLINICS' }];
  }

  return [new FetchHttpClient(), { dental: DENTAL_CLINICS_URL, vet: VET_CLINICS_URL }];
}
