import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";

import {
  AuthenticationComponent,
  EmailVerificationComponent,
  EmailVerifiedComponent,
  ErrorComponent,
  SignupComponent,
} from "@components";
import { DIContext, getDependencies } from "@helpers";
import "./app.styles.css";
import "../signup/signup.style.css";

const App: React.FC = () => {
  return (
    <DIContext.Provider value={getDependencies()}>
      <Router>
        <Switch>
          <Route exact path="/" component={SignupComponent} />
          <Route exact path="/signup" component={SignupComponent} />
          <Route
            exact
            path="/email-verification"
            component={EmailVerificationComponent}
          />
          <Route
            path="/accounts/email-verification"
            component={AuthenticationComponent}
          />
          <Route
            exact
            path="/email-verified"
            component={EmailVerifiedComponent}
          />
          <Route component={ErrorComponent} />
        </Switch>
      </Router>
    </DIContext.Provider>
  );
};

export default App;
