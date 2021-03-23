import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import { Fragment } from "react";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import ContactState from "./contexts/contact/ContactState";
import AlertState from "./contexts/alert/AlertState";
import setAuthToken from "./setAuthToken";
import AuthState from "./contexts/auth/AuthState";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import Alerts from "./component/layout/Alerts";
import PrivateRoute from "./component/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AlertState>
      <AuthState>
        <ContactState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute
                    exact
                    path="/"
                    component={Home}
                  />
                  <Route
                    exact
                    path="/about"
                    component={About}
                  />
                  <Route
                    exact
                    path="/register"
                    component={Register}
                  />
                  <Route
                    exact
                    path="/login"
                    component={Login}
                  />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ContactState>
      </AuthState>
    </AlertState>
  );
};

export default App;
