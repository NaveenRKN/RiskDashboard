import * as UserConstants from "../contsants";
import initialState from './initialState';

const LoginStore = (state = initialState.loginAuthentication, action) => {
  switch (action.type) {
    case UserConstants.POST_LOGIN:
      return {
        ...state,
        usersData: {},
        loading: true
      };
    case UserConstants.POST_LOGIN_CLEAR_SUCCESS:
      return {
        usersData: {},
        loading: false,
        authenticatedusers: {},
        logout: false
      };
    case UserConstants.POST_LOGIN_SUCCESS:
      return {
        ...state,
        usersData: action.payload,
        loading: false,
        authenticatedusers: action.payload,
        authenticatedHeader: action.header,
        logout: false
      };
    case UserConstants.LOG_OUT:
      return {
        ...state,
        usersData: [],
        loading: false,
        authenticatedusers: [],
        authenticatedHeader: [],
        logout: true
      };
    case UserConstants.POST_LOGIN_ERROR:
      return { ...state, loading: false, usersData: action.payload, error: true };
    default:
      return state;
  }
};
export default LoginStore;
