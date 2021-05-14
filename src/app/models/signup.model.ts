import { LooseObject } from "./loose-object";

export class RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName: string;

  constructor(registrationformstate: LooseObject) {
    this.firstName = registrationformstate.firstName;
    this.lastName = registrationformstate.lastName;
    this.email = registrationformstate.email;
    this.password = registrationformstate.password;
    this.organizationName = registrationformstate.organizationName;
  }
}
