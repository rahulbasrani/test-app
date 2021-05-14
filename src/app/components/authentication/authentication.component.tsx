import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";
import "react-toastify/dist/ReactToastify.css";

import { DIContext } from "@helpers";
const Danger = require("@images/danger.svg");
toast.configure();

const AuthenticationComponent: React.FC = () => {
  const dependencies = React.useContext(DIContext);
  const { authenticationService, translation } = dependencies;
  const { search } = useLocation();
  const history = useHistory();
  const { accountId, verificationId, token } = queryString.parse(search);

  const checkToken = async () => {
    try {
      const response = await authenticationService.verifyUser(
        accountId,
        verificationId,
        token
      );

      if (!response.data) {
        if (response.error == "Error: 400") {
          toast(
            <div className="toast-class">
              <span>
                <img src={Danger} alt="" className="mr-2" />
              </span>
              &nbsp;
              {translation.t("INVALID_TOKEN_ENTERED")}
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
      } else {
        history.push("/email-verified");
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleChange = () => {
    checkToken();
  };
  React.useEffect(() => {
    handleChange();
  }, []);

  return (
    <>
      <ToastContainer />
      <div onClick={handleChange}></div>
    </>
  );
};
export default AuthenticationComponent;
