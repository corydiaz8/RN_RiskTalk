const actions = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",

  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILED: "LOGOUT_FAILED",

  CHECK_AUTHORIZATION_REQUEST: "CHECK_AUTHORIZATION_REQUEST",
  CHECK_AUTHORIZATION_SUCCESS: "CHECK_AUTHORIZATION_SUCCESS",

  CHANGE_PASSWORD_REQUEST: "CHANGE_PASSWORD_REQUEST",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAILED: "CHANGE_PASSWORD_FAILED",

  FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED",

  PROFILE_REQUEST: "PROFILE_REQUEST",
  PROFILE_SUCCESS: "PROFILE_SUCCESS",

  CHANGE_PROFILE_REQUEST: "CHANGE_PROFILE_REQUEST",
  CHANGE_PROFILE_SUCCESS: "CHANGE_PROFILE_SUCCESS",
  CHANGE_PROFILE_FAILED: "CHANGE_PROFILE_FAILED",

  CREATE_MODULE_OFFLINE: "CREATE_MODULE_OFFLINE",

  CHANGE_OFFLINE_STATUS: "CHANGE_OFFLINE_STATUS",

  CHECK_CODE_REQUEST: "CHECK_CODE_REQUEST",
  CHECK_CODE_SUCCESS: "CHECK_CODE_SUCCESS",
  CHECK_CODE_FAILED: "CHECK_CODE_FAILED",

  CHANGE_FORGOT_PASSWORD_REQUEST: "CHANGE_FORGOT_PASSWORD_REQUEST",
  CHANGE_FORGOT_PASSWORD_SUCCESS: "CHANGE_FORGOT_PASSWORD_SUCCESS",
  CHANGE_FORGOT_PASSWORD_FAILED: "CHANGE_FORGOT_PASSWORD_FAILED",

  logIn: (payload, resolve, reject) => ({
    type: actions.LOGIN_REQUEST,
    payload,
    meta: {
      retry: true
    },
    resolve,
    reject
  }),
  checkAuthorization: (payload, resolve, reject) => ({
    type: actions.CHECK_AUTHORIZATION_REQUEST,
    payload,
    resolve,
    reject
  }),
  changePassword: (payload, resolve, reject) => ({
    type: actions.CHANGE_PASSWORD_REQUEST,
    payload,
    resolve,
    reject
  }),
  logOut: (resolve, reject) => ({
    type: actions.LOGOUT_REQUEST,
    resolve,
    reject
  }),
  forgotPassword: (payload, resolve, reject) => ({
    type: actions.FORGOT_PASSWORD_REQUEST,
    payload,
    resolve,
    reject
  }),
  profile: (data, resolve, reject) => ({
    type: actions.PROFILE_REQUEST,
    data,
    resolve,
    reject
  }),
  changeProfileImage: (data, resolve, reject) => ({
    type: actions.CHANGE_PROFILE_REQUEST,
    data,
    resolve,
    reject
  }),
  changeOfflineStatus: data => ({
    type: actions.CHANGE_OFFLINE_STATUS,
    data
  }),
  checkCode: (payload, resolve, reject) => ({
    type: actions.CHECK_CODE_REQUEST,
    payload,
    resolve,
    reject
  }),
  changeForgotPassword: (payload, resolve, reject) => ({
    type: actions.CHANGE_FORGOT_PASSWORD_REQUEST,
    payload,
    resolve,
    reject
  })
};

export default actions;
