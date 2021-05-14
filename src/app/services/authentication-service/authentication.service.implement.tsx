import { ServiceResponse } from "../api";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationModel } from "@models";
import Config from "@config";
const baseUrl = Config.baseUrl;

export default class AuthenticationServiceImplements
  implements AuthenticationService
{
  async verifyUser(
    accountId: string,
    verificationId: string,
    token: string
  ): Promise<ServiceResponse<AuthenticationModel>> {
    const data = { token: token };
    try {
      const res = await fetch(
        `${baseUrl}/${accountId}/email_verification/${verificationId}/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const response = await res.json();
      if (res.status == 200) {
        localStorage.setItem(
          "tokens",
          JSON.stringify(response.accessToken.token)
        );
      }
      if (res.status === 400) {
        throw new Error("400");
      }
      if (res.status === 404) {
        throw new Error("404");
      }
      return new ServiceResponse<AuthenticationModel>(data);
    } catch (error) {
      return new ServiceResponse<AuthenticationModel>(undefined, error);
    }
  }
}
