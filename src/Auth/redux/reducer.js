import actions from "./action";

const initState = {
  loginLoading: false,
  logoutLoading: false,
  userDetails: {},
  scheduleDatas: [],
  loadingChangePassword: false,
  loadingForgotPassword: false,
  loadingProfileUpload: false,
  offlineStatus: 0
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true
      };

    case actions.LOGIN_SUCCESS:
      const scheduleDatasLength =
        (action.scheduleDatas && action.scheduleDatas.length) || 0;
      return {
        ...state,
        userDetails: action.response,
        scheduleDatas: action.scheduleDatas,
        offlineStatus: scheduleDatasLength > 0 ? 1 : 0
      };

    case actions.LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false
      };

    case actions.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loadingChangePassword: true
      };
    case actions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingChangePassword: false
      };

    case actions.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        loadingChangePassword: false
      };

    case actions.LOGOUT_REQUEST:
      return {
        ...state,
        logoutLoading: true
      };

    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        userDetails: {},
        scheduleDatas: [],
        logoutLoading: false,
        loginLoading: false
      };

    case actions.LOGOUT_FAILED:
      return {
        ...state,
        logoutLoading: false,
        loginLoading: false
      };

    case actions.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loadingForgotPassword: true
      };

    case actions.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingForgotPassword: false
      };

    case actions.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loadingForgotPassword: true
      };

    case actions.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingForgotPassword: false
      };

    case actions.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        loadingForgotPassword: false
      };

    case actions.PROFILE_SUCCESS:
      return {
        ...state,
        userDetails: action.response
      };

    case actions.CHANGE_PROFILE_REQUEST:
      return {
        ...state,
        loadingProfileUpload: true
      };

    case actions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        userDetails: action.response,
        loadingProfileUpload: false,
        loginLoading: false
      };

    case actions.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        loadingProfileUpload: false,
        loginLoading: false
      };

    case actions.CREATE_MODULE_OFFLINE:
      return {
        ...state,
        scheduleDatas: action.response,
        offlineStatus: action.offlineStatus
      };

    case actions.CHANGE_OFFLINE_STATUS:
      return {
        ...state,
        offlineStatus: action.response
      };

    case actions.CHANGE_PROFILE_SUCCESS:
      return {
        ...state,
        userDetails: action.response
      };

    case actions.CHANGE_PROFILE_FAILED:
      return {
        ...state
      };

    default:
      return state;
  }
}
