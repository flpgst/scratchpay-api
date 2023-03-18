interface Availability {
  from: string;
  to: string;
}

export default class DentalClinic {
  name: string;
  statename: string;
  availability: Availability;

  constructor(props: DentalClinic) {
    Object.assign(this, props);
  }
}
