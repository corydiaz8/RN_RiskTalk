import { all, takeEvery, put, call, select } from "redux-saga/effects";
import actions from "./action";
import Api from "../../Common/settings/api";
import { network, uploadFileImage } from "../../Common/settings/commonFunc";
import { storageSave, loadStorage } from "../../Common/settings/storage";
import mainActions from "../../Main/redux/action";
const api = new Api();

function* handleOfflineOnline(payload, key, type) {
  const isConnected = yield select(network);
  if (payload !== "offline" && isConnected) {
    const response = yield call(api.post, "", payload);
    const saveData = (response && response.data && response.data.data) || [];
    yield call(storageSave, key, saveData);
  }
  if (payload === "offline") {
    const storeResponse = yield call(loadStorage, key);
    yield put({
      type,
      response: storeResponse
    });
  }
}

export function* listActivity() {
  yield takeEvery(actions.LIST_ACTIVITY_REQUEST, function*({
    payload,
    keyValue,
    resolve,
    reject
  }) {
    try {
      yield put({
        type: mainActions.CREATE_MODULE_SUCCESS_OFFLINE,
        response: "success"
      });
      yield call(
        handleOfflineOnline,
        payload,
        keyValue,
        actions.LIST_ACTIVITY_SUCCESS
      );
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.LIST_ACTIVITY_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* singleActivity() {
  yield takeEvery(actions.SINGLE_ACTIVITY_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      console.log("SINGLE ACTIVITY DATA REQUEST", payload);

      const response = yield call(api.post, "", payload);
      console.log("SINGLE ACTIVITY DATA RESPONSE", response, payload);
      yield put({
        type: actions.SINGLE_ACTIVITY_SUCCESS,
        response: response.data || {}
      });
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.SINGLE_ACTIVITY_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* saveAmendAdditional() {
  yield takeEvery(actions.SAVE_AMENDADDITIONAL_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      yield put({
        type: actions.SAVE_AMENDADDITIONAL_SUCCESS,
        response: payload
      });
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.SAVE_AMENDADDITIONAL_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* createAmendAdditional() {
  yield takeEvery(actions.CREATE_AMENDADDITIONAL_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      const responseFile = yield all(
        payload.map(upload =>
          call(
            uploadFileImage,
            upload,
            upload.selectedCompanyId,
            "additionfile",
            upload.activity_id
          )
        )
      );
      if (responseFile) {
        yield put({
          type: actions.CREATE_AMENDADDITIONAL_SUCCESS
        });
        yield call(resolve, true);
      }
    } catch (error) {
      yield put({
        type: actions.CREATE_AMENDADDITIONAL_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* listAmendAdditional() {
  yield takeEvery(actions.LIST_AMENDADDITIONAL_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      const response = yield call(api.post, "", payload);
      yield put({
        type: actions.LIST_AMENDADDITIONAL_SUCCESS,
        response: response.data.data || []
      });
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.LIST_AMENDADDITIONAL_FAILED
      });
      yield call(reject, error);
    }
  });
}

export default function* rootSaga() {
  yield all([
    listActivity(),
    singleActivity(),
    saveAmendAdditional(),
    createAmendAdditional(),
    listAmendAdditional()
  ]);
}
