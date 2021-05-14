import i18next from "i18next";
import { RouteComponentProps } from "react-router";
import {
  AuthenticationService,
  ResendEmailVerifcationService,
  SignupService,
} from "@services";

export interface AppDependenciesProps {
  authenticationService: AuthenticationService;
  translation: i18next.i18n;
  resendEmailVerifcationService: ResendEmailVerifcationService;
  signupService: SignupService;
}

export type AppProps = RouteComponentProps;
