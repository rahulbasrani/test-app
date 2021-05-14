import * as React from "react";
import { useHistory } from "react-router";

import "./email-verified.style.css";
import { ComponentViewState, DIContext } from "@helpers";
import Footer from "../footer/footer.component";
import Navbar from "../navbar/navbar.component";
const Success = require("@images/success.svg");

const EmailVerifiedComponent: React.FC = () => {
  const dependencies = React.useContext(DIContext);
  const { translation } = dependencies;
  const [componentState, setComponentState] =
    React.useState<ComponentViewState>(ComponentViewState.DEFAULT);
  const isError = componentState === ComponentViewState.ERROR;
  const history = useHistory();

  const handleClick = () => {
    history.push("/dashboard");
  };

  //            ***************   Form Element     ***************           //
  return (
    <div className="success-verified-body">
      <Navbar />
      <div className="main-content-success-verify">
        <div className="container-fluid">
          <div className="col-md-4 pt-5 text-center mx-auto my-auto">
            <img src={Success} alt="" />

            <div className="text-center success-verified-header mt-4">
              {translation.t("ACCOUNT_VERIFIED")}
            </div>
            <div className="success-email-button mt-5 col-md-12">
              <button
                type="submit"
                name="success-verified"
                id="success-verified"
                onClick={handleClick}
                className="btn btn-block btn-class sucess-email-btn"
              >
                <div className="verified-button-text">
                  <span>{translation.t("CONTINUE_TO_DASHBOARD")}</span>
                  <span className="arrow-verified"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailVerifiedComponent;
