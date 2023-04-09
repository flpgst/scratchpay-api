import { Request, Response } from 'express';

export interface IClinicController {
  list(req: Request, res: Response): Promise<Response>;
}
