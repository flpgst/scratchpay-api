interface Opening {
  from: string;
  to: string;
}

export default class VetClinic {
  clinicName: string;
  stateCode: string;
  opening: Opening;

  constructor(props: VetClinic) {
    Object.assign(this, props);
  }
}
