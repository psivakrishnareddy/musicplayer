import {
  SET_LOGIN_LOADING,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR
} from "./loginType";

const initialState = {
  isLoginLoading: false,
  isLoginSuccess: false,
  LoginError: null
};

const LoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOGIN_LOADING:
      return { ...state, isLoginLoading: payload };
    case SET_LOGIN_SUCCESS:
      return { ...state, isLoginSuccess: payload };
    case SET_LOGIN_ERROR:
      return { ...state, LoginError: payload };
    default:
      return state;
  }
};

export default LoginReducer;
