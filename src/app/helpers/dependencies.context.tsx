import * as React from "react";
import i18next from "i18next";

import {
  AuthenticationServiceImplement,
  AuthenticationService,
  ResendEmailVerificationServiceImplement,
  ResendEmailVerifcationService,
  SignupServiceImplement,
  SignupService,
} from "../services";

import { AppDependenciesProps } from "./dependencies.props";
import i18n from "./i18n";
const signupService: SignupService = new SignupServiceImplement();
const authenticationService: AuthenticationService =
  new AuthenticationServiceImplement();
const resendEmailVerifcationService: ResendEmailVerifcationService =
  new ResendEmailVerificationServiceImplement();
const translation: i18next.i18n = i18n;

export const getDependencies = (): AppDependenciesProps => {
  return {
    authenticationService,
    resendEmailVerifcationService,
    signupService,
    translation,
  };
};

const DIContext = React.createContext<AppDependenciesProps>(getDependencies());

export default DIContext;
