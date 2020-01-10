import {
  SET_LOGIN_LOADING,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR
} from "./loginType";

// ACTION CREATORS
export function setLoginLoading(isLoginLoading) {
  return {
    type: SET_LOGIN_LOADING,
    payload: isLoginLoading
  };
}

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    payload: isLoginSuccess
  };
}

export function setLoginError(LoginError) {
  return {
    type: SET_LOGIN_ERROR,
    payload: LoginError
  };
}
