import { all, fork } from "redux-saga/effects";
import authSagas from "../../Auth/redux/saga";
import mainSagas from "../../Main/redux/saga";
import reportSaga from "../../Report/redux/saga";
import { networkSaga } from "react-native-offline";
import documentSaga from "../../Document/redux/saga";

export default function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(mainSagas),
    fork(networkSaga, {
      pingInterval: 20000
    }),
    fork(reportSaga),
    fork(documentSaga)
  ]);
}
