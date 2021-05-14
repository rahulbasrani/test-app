import { RegistrationForm } from "@models";
import { ServiceResponse } from "../api";

export interface SignupService {
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    organizationName: string
  ) => Promise<ServiceResponse<RegistrationForm>>;
}
