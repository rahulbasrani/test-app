import * as React from "react";
import { useHistory } from "react-router";

import { ComponentViewState, DIContext } from "@helpers";
import "./error.style.css";
import Footer from "../footer/footer.component";
import Navbar from "../navbar/navbar.component";
const Success = require("@images/hero-error.svg");

const ErrorComponent: React.FC = () => {
  const dependencies = React.useContext(DIContext);
  const { translation, signupService } = dependencies;
  const [componentState, setComponentState] =
    React.useState<ComponentViewState>(ComponentViewState.DEFAULT);
  const isError = componentState === ComponentViewState.ERROR;
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  //            ***************   Form Element     ***************           //
  return (
    <div className="error-body">
      <Navbar />
      <div className="main-content-error">
        <div className="container-fluid">
          <div className="col-md-4 my-0 py-1 text-center mx-auto">
            <div>
              <img className="hero-error" src={Success} alt="" />
            </div>
            <div>
              <div className="text-center error-header-class mt-4">
                {translation.t("PAGE_NOT_FOUND")}
              </div>
              <div className="error-class mt-2 col-md-9 mx-auto">
                <div>{translation.t("WE_CANT_FIND_THE_PAGE")}</div>
                <div>{translation.t("ERROR_404")}</div>
              </div>
            </div>

            <div className="form-group form-button mt-5 col-md-12 ">
              <button
                type="submit"
                name="signup"
                id="signup"
                onClick={handleClick}
                className="btn btn-block  btn-class error-btn"
              >
                <div className="error-button-text">
                  <span className="error-btn-cls">
                    {translation.t("BACK_TO_HOME_PAGE")}
                  </span>

                  <span className="arrow-error"></span>
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

export default ErrorComponent;
