import { HttpClient } from '@/app/ports/http-client';

enum ClinicURL {
  DENTAL_CLINICS = 'DENTAL_CLINICS',
  VET_CLINICS = 'VET_CLINICS',
}

export const mockedClinics = {
  DENTAL_CLINICS: [
    {
      name: 'Good Health Home',
      stateName: 'Alaska',
      availability: {
        from: '10:00',
        to: '19:30',
      },
    },
    {
      name: 'Mayo Clinic',
      stateName: 'Florida',
      availability: {
        from: '09:00',
        to: '20:00',
      },
    },
  ],
  VET_CLINICS: [
    {
      clinicName: 'Good Health Home',
      stateCode: 'FL',
      opening: {
        from: '15:00',
        to: '20:00',
      },
    },
    {
      clinicName: 'National Veterinary Clinic',
      stateCode: 'CA',
      opening: {
        from: '15:00',
        to: '22:30',
      },
    },
  ],
};

class InMemoryHttpClient implements HttpClient {
  async get(url: ClinicURL): Promise<any> {
    return mockedClinics[url];
  }
}

export default InMemoryHttpClient;
