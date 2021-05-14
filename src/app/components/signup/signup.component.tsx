import * as React from "react";
import zxcvbn from "zxcvbn";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { FormikErrors, useFormik } from "formik";
import { useHistory } from "react-router";
import { ComponentViewState, DIContext } from "@helpers";
import "react-toastify/dist/ReactToastify.css";
import FormElement from "./signup.form.elemet.component";
import useFullPageLoader from "../loader/use-fullpage-loader";
import Navbar from "../navbar/navbar.component";
import Footer from "../footer/footer.component";
import SignupDescription from "./signup.description.component";
require("./signup.style.css");
const Danger = require("@images/danger.svg");
toast.configure();

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  toggle: boolean;
}

const SignupForm: React.FC = () => {
  const dependencies = React.useContext(DIContext);
  const history = useHistory();
  const { translation, signupService } = dependencies;
  const [disable, setDisable] = React.useState(true);
  const [repeatedEmail, setRepeatedEmail] = React.useState("");
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [componentState, setComponentState] =
    React.useState<ComponentViewState>(ComponentViewState.DEFAULT);
  const isError = componentState === ComponentViewState.ERROR;

  const validate = (values: FormValues) => {
    const password = values.password;
    const evaluation = zxcvbn(password);
    let errors: FormikErrors<FormValues> = {};

    if (values.firstName.length === 0) {
      errors.firstName = " ";
    } else if (values.firstName.length > 0) {
      const trimmedFirstName = values.firstName.trim();
      if (trimmedFirstName.length === 0) {
        errors.firstName = translation.t("FIRSTNAME_INCORRECT");
      } else if (values.firstName.length < 3) {
        errors.firstName = `${translation.t("ABV_2_CHARS")}`;
      }
    }

    if (values.lastName.length > 0) {
      const trimmedLastName = values.lastName.trim();
      if (trimmedLastName.length === 0) {
        errors.lastName = translation.t("LASTNAME_INCORRECT");
      }
    }

    if (values.organizationName.length > 0) {
      const trimmedorganizationName = values.organizationName.trim();
      if (trimmedorganizationName.length === 0) {
        errors.organizationName = translation.t("ORGANISATION_INCORRECT");
      }
    }

    if (values.email.length === 0) {
      errors.email = " ";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
      values.email.length > 0
    ) {
      errors.email = `${translation.t("VALID_EMAIL")}`;
    }

    if (values.password.length === 0) {
      errors.password = " ";
    } else if (values.password.length > 0 && values.password.length < 6) {
      if (values.password.length < 6) {
        errors.password = `${translation.t("PASSWORD_MUST_BE_6_CHARACTERS")}`;
      }
    }

    if (values.toggle === false) {
      errors.toggle = " ";
    }
    if (errors.firstName || errors.email || errors.password || errors.toggle) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      organizationName: "",
      toggle: false,
    },
    validate,
    onSubmit: async (values: FormValues) => {
      try {
        setDisable(true);
        showLoader();
        injectStyle();
        const response = await signupService.signup(
          values.firstName,
          values.lastName,
          values.email,
          values.password,
          values.organizationName
        );

        if (!response.data) {
          setDisable(false);
          hideLoader();
          setComponentState(ComponentViewState.ERROR);
          if (response.error == "Error: 404") {
            toast(
              <div className="toast-class">
                <span>
                  <img src={Danger} alt="" className="mr-2" />
                </span>
                <span>{translation.t("SERVER_NOT_RUNNING")}</span>
              </div>,
              {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
              }
            );
          }
          if (response.error == "Error: 400") {
            setRepeatedEmail(translation.t("EMAIL_IS_ALREADY_IN_USE"));
            toast(
              <div className="toast-class">
                <span>
                  <img src={Danger} alt="" className="mr-2" />
                </span>
                &nbsp;
                {translation.t("EMAIL_IS_ALREADY_IN_USE")}
              </div>,
              {
                position: "top-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
              }
            );
          }
        } else {
          setDisable(false);
          hideLoader();
          const email = values.email.toLowerCase();
          history.push({
            pathname: "/email-verification",
            state: { email },
          });
          setComponentState(ComponentViewState.LOADED);
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  });

  //            ***************   Form Element     ***************           //
  return (
    <div className="signup-body">
      <div className="loader-div">{loader}</div>
      <Navbar />
      <div className="main-content">
        <SignupDescription />
        <FormElement
          key={1}
          submit={formik.handleSubmit}
          repeatedEmail={repeatedEmail}
          onChange={formik.handleChange}
          values={formik.values}
          errors={formik.errors}
          onBlur={formik.handleBlur}
          touched={formik.touched}
          oncheck={formik.values.toggle}
          disabled={disable}
        />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
