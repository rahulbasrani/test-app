import * as React from "react";
import { DIContext } from "@helpers";

const Footer: React.FC = () => {
  const dependencies = React.useContext(DIContext);
  const { translation } = dependencies;
  return (
    <div className="center-wrap">
      <footer className="text-center text-lg-start">
        <div className="text-center footer-text p-3">
          {translation.t("FOOTER_PARAGRAPH")}
        </div>
        <a className="btn-contact hovers " href="/contact">
          {translation.t("CONTACT_SUPPORT")}
        </a>
      </footer>
    </div>
  );
};
export default Footer;
