import { ListClinicUseCase } from '@/app/use-cases/ListClinicUseCase';
import { ClinicController } from '@/externals/controllers/clinic/ClinicController';
import { ClinicRepositoryProvider } from '@/externals/database/providers/clinic/ClinicRepositoryProvider';
import { DentalClinicProvider } from '@/externals/database/providers/clinic/DentalClinicProvider';
import { VetClinicProvider } from '@/externals/database/providers/clinic/VetClinicProvider';
import { getHttpClient } from '@/externals/http-client/getHttpClient';
import { Request, Response, Router } from 'express';

export const routes = Router();

routes.get('/clinics', (req: Request, res: Response) => {
  /**
   * #swagger.tags = ['Clinic']
   * #swagger.description = 'Endpoint to get clinics.'
   * #swagger.parameters['name'] = { description: 'Filter clinics by name.', schema: 'Good Health' }
   * #swagger.parameters['state'] = { description: 'Filter clinics by state.',  schema: 'Alaska' }
   * #swagger.parameters['time'] = { description: 'Filter clinics available at time.', schema: '10:30' }
   */

  const [httpClient, { dental: dentalUrl, vet: vetUrl }] = getHttpClient();

  const dentalClinicProvider = new DentalClinicProvider(httpClient, dentalUrl);
  const vetClinicProvider = new VetClinicProvider(httpClient, vetUrl);

  const repository = new ClinicRepositoryProvider(dentalClinicProvider, vetClinicProvider);

  const useCase = new ListClinicUseCase(repository);
  /**
    #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Clinic" },
      description: 'Clinics found.'
  } */
  return new ClinicController(useCase).list(req, res);
});
