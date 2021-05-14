import { ServiceResponse } from "../api";
import { SignupService } from "./signup.service";
import { RegistrationForm } from "@models";
import Config from "@config";
const baseUrl = Config.baseUrl;

export default class SignupServiceImplement implements SignupService {
  static readonly RESOURCE = "/signup";
  async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    organizationName: string
  ): Promise<ServiceResponse<RegistrationForm>> {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      organizationName: organizationName,
    };
    try {
      const res = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 400) {
        throw new Error("400");
      }
      if (res.status === 404) {
        throw new Error("404");
      }
      return new ServiceResponse<RegistrationForm>(data);
    } catch (error) {
      return new ServiceResponse<RegistrationForm>(undefined, error);
    }
  }
}
