export interface Availability {
  from: string;
  to: string;
}

export interface Clinic {
  name: string;
  stateName: string;
  availability: Availability;
}
