import { Request, Response } from 'express';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status';
import ListClinic from '@/app/use-cases/clinic/list-clinic';
import Filters from '@/types/filters';

export default class ClinicController {
  constructor(private listClinicUseCase: ListClinic) {}

  async list(req: Request, res: Response) {
    const filters = req.query as Filters;

    try {
      const clinicList = await this.listClinicUseCase.execute(filters);

      return res.status(OK).json(clinicList);
    } catch (err: any) {
      return res.status(err.httpStatus || INTERNAL_SERVER_ERROR).send({ message: err.message });
    }
  }
}
