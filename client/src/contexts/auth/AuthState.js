import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../setAuthToken";
import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };
  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const register = async (formdata) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/users",
        formdata,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const login = async (formdata) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/auth",
        formdata,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const loadUser = async () => {
    let config = {};
    if (localStorage.token) {
      setAuthToken(initialState.token);
      //   config = {
      //     headers: {
      //       "x-auth-token": `${initialState.token}`,
      //     },
      //   };
    }
    try {
      const res = await axios.get("/api/auth", config);
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
