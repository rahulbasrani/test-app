import { RegistrationForm } from "@models";
import { ComponentState } from "@helpers";

export interface UserState extends ComponentState {
  registerFormState?: RegistrationForm;
}
