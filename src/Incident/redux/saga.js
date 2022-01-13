import { all, takeEvery, put, call, select } from "redux-saga/effects";
import actions from "./action";
import Api from "../../Common/settings/api";
import {
  userDetails,
  currentTimeStamp,
  uploadImageAudio,
  lastValueOfArray
} from "../../Common/settings/commonFunc";
import Axios from "axios";

const api = new Api();

export default function* rootSaga() {
  yield all([createAssessment()]);
}
