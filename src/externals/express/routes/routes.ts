import { Router } from 'express';
import ClinicController from '@/externals/controllers/clinic/clinic-controller';

const routes = Router();

routes.get('/clinics', ClinicController.list);

export default routes;
