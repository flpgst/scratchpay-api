import { IAvailability } from './IAvailability';

export interface IClinic {
  name: string;
  stateName: string;
  availability: IAvailability;
}

