import { ResendEmail } from "@models";
import { ServiceResponse } from "../api";

export interface ResendEmailVerifcationService {
  resendEmail: (
    email: string | undefined
  ) => Promise<ServiceResponse<ResendEmail>>;
}
