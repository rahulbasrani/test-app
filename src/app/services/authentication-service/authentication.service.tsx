import { AuthenticationModel } from "@models";
import { ServiceResponse } from "../api";

export interface AuthenticationService {
  verifyUser: (
    accountId: string | string[] | null,
    verificationId: string | string[] | null,
    token: string | string[] | null
  ) => Promise<ServiceResponse<AuthenticationModel>>;
}
