import { LooseObject } from "./loose-object";

export class ResendEmail {
  email: string;

  constructor(resendemail: LooseObject) {
    this.email = resendemail.email;
  }
}
