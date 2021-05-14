export class AuthenticationModel {
  token: string;

  constructor(autheticateuser: { token: string }) {
    this.token = autheticateuser.token;
  }
}
