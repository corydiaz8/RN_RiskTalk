import { all, takeEvery, put, call, select } from "redux-saga/effects";
import actions from "./action";
import Api from "../../Common/settings/api";
import {
  loadStorage,
  storageSave,
  clearStorage
} from "../../Common/settings/storage";
import {
  network,
  uploadFileImage,
  userDetails
} from "../../Common/settings/commonFunc";
const api = new Api();

export function* logIn() {
  yield takeEvery(actions.LOGIN_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      const response = yield call(api.post, "", payload);
      if (response.data.status === 1) {
        yield put({
          type: actions.LOGIN_SUCCESS,
          response: response.data.data
        });
        yield call(storageSave, "userDetails", response.data.data);
        yield call(storageSave, "scheduleDatas", []);
      } else {
        yield put({
          type: actions.LOGIN_FAILED
        });
      }
      yield call(resolve, response.data.status);
    } catch (error) {
      yield put({
        type: actions.LOGIN_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      if (payload === "authorized") {
        const response = yield call(loadStorage, "userDetails");
        const scheduleDatas = yield call(loadStorage, "scheduleDatas");
        yield put({
          type: actions.LOGIN_SUCCESS,
          response: response,
          scheduleDatas
        });
      } else {
        yield put({
          type: actions.LOGIN_SUCCESS,
          response: {},
          scheduleDatas: []
        });
      }
      if (resolve) {
        yield call(resolve, true);
      }
    } catch (error) {
      yield call(reject, error);
    }
  });
}

export function* changePassword() {
  yield takeEvery(actions.CHANGE_PASSWORD_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      const response = yield call(api.post, "", payload);
      console.log("SAGA CHANGE PASSWORD", response);
      if (response.data.status === 1) {
        yield call(storageSave, "userDetails", {});
        yield put({
          type: actions.CHANGE_PASSWORD_SUCCESS
        });
      } else {
        yield put({
          type: actions.CHANGE_PASSWORD_FAILED
        });
      }
      yield call(resolve, response.data.status);
    } catch (error) {
      console.log("SAGA CHANGE ERROR", error);
      yield put({
        type: actions.CHANGE_PASSWORD_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* logOut() {
  yield takeEvery(actions.LOGOUT_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      yield call(storageSave, "userDetails", {});
      yield call(clearStorage);
      yield put({
        type: actions.LOGOUT_SUCCESS
      });
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.LOGOUT_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* profile() {
  yield takeEvery(actions.PROFILE_REQUEST, function*({
    data,
    resolve,
    reject
  }) {
    try {
      const isConnected = yield select(network);
      if (isConnected) {
        const response = yield call(api.post, "", data);
        console.log("SUCCESS PROFILE", response);
        yield call(storageSave, "userDetails", response.data.data);
        yield put({
          type: actions.PROFILE_SUCCESS,
          response: response.data.data
        });
      }
      yield call(resolve, true);
    } catch (error) {
      yield call(reject, error);
    }
  });
}

export function* forgetPassword() {
  yield takeEvery(actions.FORGOT_PASSWORD_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      const response = yield call(api.post, "", payload);
      yield put({
        type: actions.FORGOT_PASSWORD_SUCCESS
      });
      yield call(resolve, response.data);
    } catch (error) {
      yield put({
        type: actions.FORGOT_PASSWORD_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* changeProfileImage() {
  yield takeEvery(actions.CHANGE_PROFILE_REQUEST, function*({
    data,
    resolve,
    reject
  }) {
    try {
      const isConnected = yield select(network);
      const auth = yield select(userDetails);
      if (isConnected) {
        const response = yield call(
          uploadFileImage,
          data,
          undefined,
          "profile"
        );

        const sendData = {
          ...auth.userDetails,
          avatar: response.data.data.avatar
        };

        yield put({
          type: actions.CHANGE_PROFILE_SUCCESS,
          response: sendData
        });
        yield call(storageSave, "userDetails", sendData);

        return yield call(resolve, {
          message: response.data.message
        });
      }
      yield call(resolve, true);
    } catch (error) {
      console.log("ERROR", error);
      yield put({
        type: actions.CHANGE_PROFILE_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* checkCode() {
  yield takeEvery(actions.CHECK_CODE_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      const response = yield call(api.post, "", payload);
      yield call(resolve, response.data);
    } catch (error) {
      yield call(reject, error);
    }
  });
}

export function* changeForgotPassword() {
  yield takeEvery(actions.CHANGE_FORGOT_PASSWORD_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      const response = yield call(api.post, "", payload);
      console.log("CHANGE PASSWORD", response);
      yield call(resolve, response.data);
    } catch (error) {
      yield call(reject, error);
    }
  });
}

export default function* rootSaga() {
  yield all([
    logIn(),
    checkAuthorization(),
    changePassword(),
    logOut(),
    forgetPassword(),
    profile(),
    changeProfileImage(),
    checkCode(),
    changeForgotPassword()
  ]);
}
