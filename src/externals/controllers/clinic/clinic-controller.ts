import { Request, Response } from 'express';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status';
import ListClinic from '@/app/use-cases/clinic/list';
import ClinicRepositoryProvider from '@/externals/database/providers/clinic-repository-provider';

export default class ClinicController {
  static async list(req: Request, res: Response) {
    const { filters } = req.params;

    try {
      const clinicList = await ListClinic.execute(filters, new ClinicRepositoryProvider());

      return res.status(OK).send(clinicList);
    } catch (err: any) {
      return res.status(err.httpStatus || INTERNAL_SERVER_ERROR).send({ message: err.message });
    }
  }
}
