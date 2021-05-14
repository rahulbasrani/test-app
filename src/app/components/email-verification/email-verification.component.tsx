import * as React from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useFullPageLoader from "../loader/use-fullpage-loader";
import { ComponentViewState, DIContext } from "@helpers";
import "./email.style.css";
import Footer from "../footer/footer.component";
import Navbar from "../navbar/navbar.component";
const Danger = require("@images/danger.svg");
const Success = require("@images/tick-square.svg");
const HeroMessage = require("@images/hero-message.svg");

interface IState {
  email?: string;
}

const EmailVerificationComponent: React.FC = () => {
  const dependencies = React.useContext(DIContext);
  const history = useHistory();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const { translation, resendEmailVerifcationService } = dependencies;
  const [componentState, setComponentState] =
    React.useState<ComponentViewState>(ComponentViewState.DEFAULT);
  const isError = componentState === ComponentViewState.ERROR;

  const location = useLocation();
  const email = (location.state as IState).email;

  const resendChange = async () => {
    try {
      showLoader();
      const response = await resendEmailVerifcationService.resendEmail(email);
      if (response.data) {
        toast(
          <div className="toast-class">
            <span>
              <img src={Success} alt="" className="mr-2" />
            </span>
            {translation.t("NEW_CONFIRMATION_EMAIL_SENT")}
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
        hideLoader();
        setComponentState(ComponentViewState.LOADED);
      } else {
        hideLoader();

        if (response.error == "Error: 404") {
          toast(
            <div className="toast-class">
              <span>
                <img src={Danger} alt="" className="mr-2" />
              </span>
              {translation.t("SERVER_NOT_RUNNING")}
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
          toast(
            <div className="toast-class">
              <span>
                <img src={Danger} alt="" className="mr-2" />
              </span>
              {translation.t("RESEND_FAILED")}
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
        setComponentState(ComponentViewState.ERROR);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const logoutEmail = () => {
    history.push("/login");
  };

  return (
    <div className="email-body">
      <div className="loader-div">{loader}</div>
      <Navbar />
      <div className="main-content-email">
        <div className="container-fluid">
          <div className="img-div-email col-md-6">
            <div className="col-md-12 text-left">
              <img
                src={HeroMessage}
                className="email-verification-hero"
                alt=""
              />
            </div>
          </div>

          <section className=" email-verification-section col-md-6">
            <div className="container-fluid">
              <div className="col-md-9 col-11">
                <div className="verify-email-heading col-md-12 mb-3">
                  {translation.t("VERIFY_YOUR_EMAIL")}
                </div>
                <div className="text-left verification-class col-md-12">
                  <span>{translation.t("VERIFICATION_EMAIL_SENT")}</span>
                  <span className="font-weight-bold">{`${email}.`}</span>
                  <span>{translation.t("CHECK_INBOX")}</span>
                </div>
                <div className="col-md-12 button-email">
                  <button
                    type="submit"
                    name="logout"
                    onClick={logoutEmail}
                    id="logout"
                    className="btn btn-block email-btn btn-class"
                  >
                    <div className="email-button-text">
                      <span className="arrow-email"></span>
                      <span className="email-btn-cls">
                        {translation.t("LOGOUT")}
                      </span>
                    </div>
                  </button>
                </div>

                <div className="text-left last-para col-md-12">
                  <span>
                    <span className="text-left verification-class gray-class">
                      {translation.t("EMAIL_VERIFICATION")}
                    </span>
                    &nbsp;
                    <span>
                      <a
                        onClick={resendChange}
                        className="anchor-class-verification text-decoration-none"
                      >
                        {translation.t("CLICK_RESEND")}
                      </a>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
      <ToastContainer style={{ width: "400px" }} />
    </div>
  );
};

export default EmailVerificationComponent;
