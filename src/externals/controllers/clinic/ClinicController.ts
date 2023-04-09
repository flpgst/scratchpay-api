import { IClinicController } from '@/types/controller/IClinicController';
import { IFilters } from '@/types/IFilters';
import { IListClinicUseCase } from '@/types/use-cases/IListClinicUseCase';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';

export class ClinicController implements IClinicController {
  constructor(private listClinicUseCase: IListClinicUseCase) {}

  async list(req: Request, res: Response): Promise<Response> {
    const filters = req.query as Request['query'] & IFilters;

    try {
      const clinicList = await this.listClinicUseCase.execute(filters);

      return res.status(OK).json(clinicList);
    } catch (err: any) {
      return res.status(err.httpStatus || INTERNAL_SERVER_ERROR).send({ message: err.message });
    }
  }
}
