import * as React from "react";
import { DIContext } from "@helpers";
const Logo = require("@images/logo.svg");

const Navbar: React.FC = () => {
  const dependencies = React.useContext(DIContext);
  const { translation } = dependencies;
  return (
    <div>
      <nav className="navbar navbar-expand-lg col-md-11 mx-auto navbar-light">
        <a className="navbar-brand" href="/signup">
          <img src={Logo} alt="reactangel1" />
        </a>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  ml-auto">
            <li className="nav-item">
              <a className="mr-3 anchor-class anchor-class-login" href="/login">
                {translation.t("LOGIN")}
              </a>
            </li>

            <li className="nav-item ">
              <a className="btn-contact hovers py-3 px-4" href="/signup">
                <span className="anchor-class-login">
                  {translation.t("REGISTER_WITH_US")}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
    </div>
  );
};
export default Navbar;
