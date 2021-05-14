import { ServiceResponse } from "../api";
import { ResendEmailVerifcationService } from "./resend-email-verification.service";
import { ResendEmail } from "@models";
import Config from "@config";
const baseUrl = Config.baseUrl;

export default class ResendEmailVerifcationServiceImplements
  implements ResendEmailVerifcationService
{
  static readonly RESOURCE = "/signup";
  async resendEmail(email: string): Promise<ServiceResponse<ResendEmail>> {
    const data = {
      email: email,
    };
    try {
      const res = await fetch(`${baseUrl}/email-verification`, {
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
      return new ServiceResponse<ResendEmail>(data);
    } catch (error) {
      return new ServiceResponse<ResendEmail>(undefined, error);
    }
  }
}
