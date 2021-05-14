import * as React from "react";
import { DIContext } from "@helpers";

interface Props {
  submit: () => void;
  values: {
    organizationName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  errors: {
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    organizationName?: string | undefined;
  };
  touched: {
    firstName?: boolean | undefined;
    lastName?: boolean | undefined;
    email?: boolean | undefined;
    password?: boolean | undefined;
    organizationName?: boolean | undefined;
  };
  onChange?: React.EventHandler<any>;
  onBlur?: React.EventHandler<any>;
  oncheck: boolean;
  disabled: boolean;
  repeatedEmail: string;
}

const FormElement = ({
  submit,
  values,
  errors,
  touched,
  onChange,
  onBlur,
  oncheck,
  disabled,
  repeatedEmail,
}: Props) => {
  const dependencies = React.useContext(DIContext);
  const { translation, signupService } = dependencies;

  return (
    <>
      <section className="signup-form col-md-6">
        <div className="container-fluid">
          <div className="col-md-10  col-sm-12 signupform-div ">
            <div className="">
              <h1 className="form-title col-md-12 mb-3">
                {translation.t("SIGN_UP")}
              </h1>
              <div className="text-left col-md-12">
                <span className="account-class ">
                  {translation.t("ALREADY_HAVE_ACCOUNT")}
                </span>
                &nbsp;
                <span>
                  <a href="/login" className="anchor-class anchor-class-log">
                    {translation.t("LOGIN")}
                  </a>
                </span>
              </div>

              <form
                className="register-form mt-3 col-md-12"
                id="register-form"
                autoComplete="off"
                onSubmit={submit}
                method="POST"
              >
                <div className="form-group form-controls col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    name="organizationName"
                    value={values.organizationName}
                    onChange={onChange}
                    onBlur={onBlur}
                    id="organizationName"
                    autoComplete="off"
                    placeholder={translation.t("ORGANISATION_NAME")}
                  />
                  {touched.organizationName && errors.organizationName ? (
                    <span className="error">{errors.organizationName}</span>
                  ) : null}
                </div>

                <div className="row mx-auto">
                  <div className="form-group col-md-6">
                    <input
                      className=" form-control"
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={values.firstName}
                      onChange={onChange}
                      onBlur={onBlur}
                      autoComplete="off"
                      placeholder={translation.t("FIRST_NAME")}
                    />
                    {touched.firstName && errors.firstName ? (
                      <span className="error ">{errors.firstName}</span>
                    ) : null}
                  </div>

                  <div className="form-group col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={onChange}
                      onBlur={onBlur}
                      id="lastName"
                      autoComplete="off"
                      placeholder={translation.t("LAST_NAME")}
                    />
                    {touched.lastName && errors.lastName ? (
                      <span className="error ">{errors.lastName}</span>
                    ) : null}
                  </div>
                </div>
                <div className="form-group form-control-email col-md-12">
                  <input
                    className={
                      repeatedEmail
                        ? "form-control border-error"
                        : "form-control"
                    }
                    type="email"
                    name="email"
                    data-test-id="email-field"
                    value={values.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    id="email-input"
                    autoComplete="off"
                    placeholder={translation.t("EMAIL_NAME")}
                  />
                  {touched.email && errors.email ? (
                    <div className="error">{errors.email}</div>
                  ) : null}
                  {touched.email && repeatedEmail ? (
                    <div className="error">{repeatedEmail}</div>
                  ) : null}
                </div>

                <div className="form-group form-group-lg form-control-password col-md-12">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    onBlur={onBlur}
                    id="password"
                    autoComplete="off"
                    placeholder={translation.t("PASSWORD_NAME")}
                  />
                  {touched.password && errors.password ? (
                    <div className="error">{errors.password}</div>
                  ) : null}
                </div>

                <div className="bottom-info checkbox d-flex box col-md-12">
                  <input
                    type="checkbox"
                    id="chkbx"
                    onBlur={onBlur}
                    onChange={onChange}
                    name="toggle"
                    checked={oncheck}
                  />
                  <label htmlFor="chkbx"></label>
                  <span>{translation.t("SUBMIT_BUTTON_STRING")}</span>&nbsp;
                  <span>
                    <a href="/tnc" className="anchor-class-checkbox">
                      {translation.t("TERMS_OF_USE")}
                    </a>
                  </span>
                  &nbsp;
                  <span>{translation.t("AND")}</span>
                  &nbsp;
                  <span>
                    <a href="/privacy" className="anchor-class-checkbox">
                      {translation.t("PRIVACY")}
                    </a>
                    .
                  </span>
                </div>
                <div className="form-group form-button col-md-12 ">
                  <button
                    type="submit"
                    name="signup"
                    disabled={disabled}
                    id="signup"
                    className="btn btn-block btn-lg btn-class signup-btn"
                  >
                    <div className="signup-button-text">
                      <span className="signup-submit-btn-cls">
                        {translation.t("CREATE_ACCOUNT_BUTTON")}
                      </span>

                      <span className="arrow"></span>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormElement;
