import { Request, Response, Router } from 'express';
import ClinicController from '@/externals/controllers/clinic/clinic-controller';
import ListClinic from '@/app/use-cases/clinic';
import ClinicRepositoryProvider from '@/externals/database/providers/clinic-provider/clinic-repository-provider';
import FetchHttpClient from '@/externals/http-client/fetch-http-client';
import DentalClinicProvider from '@/externals/database/providers/clinic-provider/dental-clinic-provider';
import VetClinicProvider from '@/externals/database/providers/clinic-provider/vet-clinic-provider';
import { DENTAL_CLINICS } from '@/externals/providers/scratchpay';
import { VET_CLINICS } from '@/externals/providers/scratchpay';

const routes = Router();

routes.get('/clinics', (req: Request, res: Response) => {
  /**
   * #swagger.tags = ['Clinic']
   * #swagger.description = 'Endpoint to get clinics.'
   * #swagger.parameters['name'] = { description: 'Filter clinics by name.', schema: 'Good Health' }
   * #swagger.parameters['state'] = { description: 'Filter clinics by state.',  schema: 'Alaska' }
   * #swagger.parameters['time'] = { description: 'Filter clinics available at time.', schema: '10:30' }
   */
  const httpClient = new FetchHttpClient();
  const dentalClinicProvider = new DentalClinicProvider(httpClient, DENTAL_CLINICS);
  const vetClinicProvider = new VetClinicProvider(httpClient, VET_CLINICS);
  const repository = new ClinicRepositoryProvider(dentalClinicProvider, vetClinicProvider);
  const useCase = new ListClinic(repository);
  /**
    #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Clinic" },
      description: 'Clinics found.'
  } */
  return new ClinicController(useCase).list(req, res);
});

export default routes;
