import { all, takeEvery, put, call } from "redux-saga/effects";
import actions from "./action";
import Api from "../../Common/settings/api";

const api = new Api();

export function* listDocument() {
  yield takeEvery(actions.LIST_DOCUMENT_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      console.log("DATRA", payload);
      const response = yield call(api.post, "", payload);
      console.log("RESPONSE DOCUMENT", response);
      yield put({
        type: actions.LIST_DOCUMENT_SUCCESS,
        response: response.data.data ? response.data.data : []
      });
      yield call(resolve, true);
    } catch (error) {
      console.log("ERROR DOCUMENT", error);
      yield put({
        type: actions.LIST_DOCUMENT_FAILED
      });
      yield call(reject, error);
    }
  });
}

export default function* rootSaga() {
  yield all([listDocument()]);
}
