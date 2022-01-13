import { all, takeEvery, put, call, select, delay } from "redux-saga/effects";
import actions from "./action";
import authActions from "../../Auth/redux/action";
import { storageSave, loadStorage } from "../../Common/settings/storage";
import Api from "../../Common/settings/api";
import {
  network,
  uploadFileImage,
  offlineStatus,
  scheduleDatas,
  removeFileFromDevice
} from "../../Common/settings/commonFunc";

const api = new Api();

const getDataFromTemporaryData = (payload, request_for) => {
  const { observation, assessment, incident, hazard } = payload;
  if (request_for === "add_assessment") {
    return assessment;
  } else if (request_for === "add_observation") {
    return observation;
  } else if (request_for === "add_incident") {
    return incident;
  } else if (request_for === "add_hazard") {
    return hazard;
  }
};

function* handleOfflineOnline(payload, key, type) {
  const isConnected = yield select(network);
  if (isConnected && payload !== "offline") {
    const response = yield call(api.post, "", payload);
    console.log("SERVER RESPONSE", response, key);
    yield call(storageSave, key, response.data.data || []);
    yield put({
      type,
      response: response.data.data || []
    });
  } else {
    const storeResponse = yield call(loadStorage, key);
    yield put({
      type,
      response: storeResponse
    });
  }
}

export function* saveDataTemporary() {
  yield takeEvery(actions.SAVE_DATA_TEMPORARY_REQUEST, function*({
    key,
    payload,
    resolve,
    reject
  }) {
    try {
      yield put({
        type: actions.SAVE_DATA_TEMPORARY_SUCCESS,
        response: payload
      });
      yield call(storageSave, key, payload);
      yield call(resolve, true);
    } catch (error) {
      yield call(reject, error);
    }
  });
}

export function* listTask() {
  yield takeEvery(actions.LIST_TASK_REQUEST, function*({
    payload,
    keyValue,
    resolve,
    reject
  }) {
    try {
      yield call(
        handleOfflineOnline,
        payload,
        keyValue,
        actions.LIST_TASK_SUCCESS
      );
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.LIST_TASK_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* listRisk() {
  yield takeEvery(actions.LIST_RISK_REQUEST, function*({
    payload,
    keyValue,
    resolve,
    reject
  }) {
    try {
      yield call(
        handleOfflineOnline,
        payload,
        keyValue,
        actions.LIST_RISK_SUCCESS
      );
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.LIST_RISK_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* listQuestion() {
  yield takeEvery(actions.LIST_QUESTION_REQUEST, function*({
    payload,
    keyValue,
    resolve,
    reject
  }) {
    try {
      yield call(
        handleOfflineOnline,
        payload,
        keyValue,
        actions.LIST_QUESTION_SUCCESS
      );
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.LIST_QUESTION_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* listLikeliHood() {
  yield takeEvery(actions.LIST_LIKELIHOOD_REQUEST, function*({
    payload,
    keyValue,
    resolve,
    reject
  }) {
    try {
      yield call(
        handleOfflineOnline,
        payload,
        keyValue,
        actions.LIST_LIKELIHOOD_SUCCESS
      );
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.LIST_LIKELIHOOD_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* listConsequence() {
  yield takeEvery(actions.LIST_CONSEQUENCE_REQUEST, function*({
    payload,
    keyValue,
    resolve,
    reject
  }) {
    try {
      yield call(
        handleOfflineOnline,
        payload,
        keyValue,
        actions.LIST_CONSEQUENCE_SUCCESS
      );
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.LIST_CONSEQUENCE_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* listActualConsequence() {
  yield takeEvery(actions.LIST_ACTUAL_CONSEQUENCE_REQUEST, function*({
    payload,
    keyValue,
    resolve,
    reject
  }) {
    try {
      yield call(
        handleOfflineOnline,
        payload,
        keyValue,
        actions.LIST_ACTUAL_CONSEQUENCE_SUCCESS
      );
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.LIST_ACTUAL_CONSEQUENCE_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* listRatingValue() {
  yield takeEvery(actions.LIST_RATING_VALUE_REQUEST, function*({
    payload,
    keyValue,
    resolve,
    reject
  }) {
    try {
      yield call(
        handleOfflineOnline,
        payload,
        keyValue,
        actions.LIST_RATING_VALUE_SUCCESS
      );
      yield call(resolve, true);
    } catch (error) {
      yield put({
        type: actions.LIST_RATING_VALUE_FAILED
      });
      yield call(reject, error);
    }
  });
}

export function* saveAudioTemporary() {
  yield takeEvery(actions.SAVE_AUDIO_TEMPORARY_REQUEST, function*({
    data,
    resolve,
    reject
  }) {
    try {
      yield put({
        type: actions.SAVE_AUDIO_TEMPORARY_SUCCESS,
        response: data
      });
      yield call(resolve, true);
    } catch (error) {
      yield call(reject, true);
    }
  });
}

export function* createModule() {
  yield takeEvery(actions.CREATE_MODULE_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      const {
        selectedCompanyId,
        selectedProjectId,
        user_id,
        request_for,
        rating_value_id,
        latitude,
        longitude,
        selectName,
        upload_files,
        created_at
      } = payload;

      const data_result = yield call(
        getDataFromTemporaryData,
        payload,
        request_for
      );
      const sendData = {
        company_id: selectedCompanyId,
        project_id: selectedProjectId,
        request_for,
        user_id,
        latitude: latitude || null,
        longitude: longitude || null,
        rating_value_id,
        data_result,
        created_at
      };
      console.log("CREATE ASSESSMENT", sendData);
      const isConnected = yield select(network);
      const uploadFiles = upload_files.map((upload, index) => {
        return {
          ...upload,
          created_at,
          unique_id: index,
          company_id: selectedCompanyId,
          project_id: selectedProjectId
        };
      });
      if (isConnected) {
        const response = yield call(api.post, "", sendData);
        if (response) {
          const responseFile = yield all(
            uploadFiles.map(upload =>
              call(uploadFileImage, upload, upload.company_id, "file")
            )
          );
          const deleteResponseFile = yield all(
            responseFile.map(file => call(removeFileFromDevice, file))
          );
          if (responseFile) {
            yield put({
              type: actions.CREATE_MODULE_SUCCESS
            });

            yield call(resolve, true);
          }
        }
      } else {
        const scheduleDatasFromStore = yield call(loadStorage, "scheduleDatas");
        const scheduleDatas = [
          ...scheduleDatasFromStore,
          {
            unique_id: created_at,
            module_name: request_for,
            sendData,
            upload_files: uploadFiles,
            selectName,
            isUploadData: false,
            company_id: selectedCompanyId,
            project_id: selectedProjectId,
            action_type: actions.CREATE_MODULE_REQUEST
          }
        ];
        const requestForQueue = yield call(
          storageSave,
          "scheduleDatas",
          scheduleDatas
        );
        yield put({
          type: actions.CREATE_MODULE_SUCCESS
        });
        yield put({
          type: authActions.CREATE_MODULE_OFFLINE,
          response: scheduleDatas,
          offlineStatus: 1
        });
        yield call(resolve, true);
      }
    } catch (error) {
      console.log("ERROR", error);
      yield put({
        type: actions.CREATE_MODULE_FAILED
      });
      yield call(reject, error);
    }
  });
}

const uploadData = (payload, filterCreatedAt) => {
  const filterScheduleDatas = payload.map(schedule => {
    if (filterCreatedAt.includes(schedule.created_at)) {
      delete schedule["sendData"];
      return {
        ...schedule,
        isUploadData: true
      };
    }
    return {
      ...schedule,
      isUploadData: schedule["sendData"] ? false : true
    };
  });
  return filterScheduleDatas;
};

const uploadFile = (responseUploadData, filterFile) => {
  const filterScheduleDatas = responseUploadData.map(schedule => {
    let uploadFile = schedule.upload_files.map(upload => {
      if (filterFile.includes(upload.file)) {
        return {};
      }
      return {
        ...upload
      };
    });
    const upload_files = uploadFile.filter(
      value => Object.keys(value).length !== 0
    );
    if (upload_files.length === 0) {
      delete schedule["upload_files"];
      return {
        ...schedule
      };
    }
    return {
      ...schedule,
      upload_files
    };
  });
  return filterScheduleDatas;
};
export function* uploadScheduleData() {
  yield takeEvery(actions.UPLOAD_SCHEDULE_DATA_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      console.log("PAYLOAD", payload);
      yield put({
        type: authActions.CREATE_MODULE_OFFLINE,
        response: payload,
        offlineStatus: 0
      });

      const responseData = yield all(
        payload.map(schedule => {
          if (schedule.sendData) {
            return call(api.post, "", schedule.sendData);
          } else {
            return { ...schedule, isUploadData: true };
          }
        })
      );
      console.log("API CALL RESPONSE", responseData);
      const filterCreatedAt = responseData.map(response => {
        if (response.isUploadData) {
          return response.unique_id;
        }
        if (!response || response === undefined) {
          return 0;
        }
        if (response) {
          let {
            data,
            data: { status }
          } = response;
          if (status === 1) {
            return data.created_at;
          }
          return 0;
        }
      });

      const responseUploadData = yield call(
        uploadData,
        payload,
        filterCreatedAt
      );
      console.log("responseUploadData", responseUploadData);
      const dataForFilesUpload = responseUploadData.map(response => {
        if (response.isUploadData) {
          return response.upload_files.map(upload => {
            return upload;
          });
        }
      });
      const appendDataForFilesUploadInSingleArray = dataForFilesUpload.flat();
      console.log(
        "appendDataForFilesUploadInSingleArray",
        dataForFilesUpload,
        appendDataForFilesUploadInSingleArray
      );
      const uploadDataAgain = yield all(
        appendDataForFilesUploadInSingleArray.map(upload => {
          if (upload && upload.company_id) {
            return call(uploadFileImage, upload, upload.company_id, "file");
          }
          return undefined;
        })
      );
      const responseUploadFileWithData = yield call(
        uploadFile,
        responseUploadData,
        uploadDataAgain
      );
      if (uploadDataAgain) {
        const deleteResponseFile = yield all(
          uploadDataAgain.map(file => call(removeFileFromDevice, file))
        );
      }
      const filterDataForOffline = responseUploadFileWithData.filter(
        response => {
          if (response["upload_files"] || response["sendData"]) {
            return {
              ...response
            };
          }
        }
      );
      const filterDataForOfflineLength = filterDataForOffline.length;
      const sendfilterDataForOffline =
        filterDataForOfflineLength > 0 ? filterDataForOffline : [];
      yield put({
        type: authActions.CREATE_MODULE_OFFLINE,
        response: sendfilterDataForOffline,
        offlineStatus: filterDataForOfflineLength > 0 ? 1 : 0
      });
      const requestForQueue = yield call(
        storageSave,
        "scheduleDatas",
        sendfilterDataForOffline
      );
      yield put({
        type: actions.CREATE_MODULE_SUCCESS_OFFLINE,
        response: "pending"
      });
      yield call(resolve, true);
    } catch (error) {
      yield call(reject, error);
    }
  });
}

export function* createTask() {
  yield takeEvery(actions.CREATE_TASK_REQUEST, function*({
    payload,
    resolve,
    reject
  }) {
    try {
      const response = yield call(api.post, "", payload);
      yield put({
        type: actions.CREATE_TASK_SUCCESS
      });
      yield call(resolve, response.data.data);
    } catch (error) {
      yield put({
        type: actions.CREATE_TASK_FAILED
      });
      yield call(reject, true);
    }
  });
}

export default function* rootSaga() {
  yield all([
    saveDataTemporary(),
    listTask(),
    listRisk(),
    listQuestion(),
    listLikeliHood(),
    listConsequence(),
    listActualConsequence(),
    listRatingValue(),
    saveAudioTemporary(),
    createModule(),
    uploadScheduleData(),
    createTask()
  ]);
}
