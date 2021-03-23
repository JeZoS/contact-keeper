import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import AlertContext from "../../contexts/alert/alertContext";
import AuthContext from "../../contexts/auth/authContext";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {
    login,
    error,
    clearErrors,
    isAuthenticated,
  } = authContext;
  const { setAlert } = alertContext;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    clearErrors();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("All fields are required", "danger");
    } else {
      login({ email, password });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (typeof error === String) {
      setAlert(error, "danger");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>{" "}
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
