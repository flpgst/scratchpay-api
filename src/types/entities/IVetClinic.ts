import { IAvailability } from './IAvailability';

interface IOpening extends IAvailability {}

export interface IVetClinic {
  clinicName: string;
  stateCode: string;
  opening: IOpening;
}
