import React from "react";
import { DIContext } from "@helpers";
const Hero = require("@images/signup-hero.svg");
const CheckMark = require("@images/check-circle.svg");

const SignupDescription: React.FC = () => {
  const dependencies = React.useContext(DIContext);
  const { translation } = dependencies;
  return (
    <div className="container-fluid">
      <div className="img-div col-md-6 col-lg-6">
        <div className="col-md-8 col-lg-8 mt-5 mx-auto text-left">
          <div className="descrition-class">
            <div className="px-3 create-account-class">
              {translation.t("CREATE_A_ACCOUNT_INFO")}
            </div>

            <div>
              <div className="standard-class ">
                <span className="col-md-1 mt-2 check-class">
                  <img src={CheckMark} alt="" />
                </span>
                <div className="mt-2 col-md-11 check-text">
                  {translation.t("CHECK_1")}
                </div>
              </div>
              <div className="standard-class ">
                <span className="col-md-1 mt-2 check-class">
                  <img src={CheckMark} alt="" />
                </span>
                <div className="mt-2 col-md-11  check-text">
                  {translation.t("CHECK_2")}
                </div>
              </div>

              <div className="standard-class ">
                <span className="col-md-1 mt-2 check-class">
                  <img src={CheckMark} alt="" />
                </span>

                <div className="mt-2 col-md-11  check-text">
                  {translation.t("CHECK_3")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img className="hero-actual " src={Hero} alt=" " />
        </div>
      </div>
    </div>
  );
};
export default SignupDescription;
