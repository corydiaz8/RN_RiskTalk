const actions = {
  SAVE_DATA_TEMPORARY_REQUEST: "SAVE_DATA_TEMPORARY_REQUEST",
  SAVE_DATA_TEMPORARY_SUCCESS: "SAVE_DATA_TEMPORARY_SUCCESS",

  LIST_TASK_REQUEST: "LIST_TASK_REQUEST",
  LIST_TASK_SUCCESS: "LIST_TASK_SUCCESS",
  LIST_TASK_FAILED: "LIST_TASK_FAILED",

  LIST_RISK_REQUEST: "LIST_RISK_REQUEST",
  LIST_RISK_SUCCESS: "LIST_RISK_SUCCESS",
  LIST_RISK_FAILED: "LIST_RISK_FAILED",

  LIST_QUESTION_REQUEST: "LIST_QUESTION_REQUEST",
  LIST_QUESTION_SUCCESS: "LIST_QUESTION_SUCCESS",
  LIST_QUESTION_FAILED: "LIST_QUESTION_FAILED",

  LIST_LIKELIHOOD_REQUEST: "LIST_LIKELIHOOD_REQUEST",
  LIST_LIKELIHOOD_SUCCESS: "LIST_LIKELIHOOD_SUCCESS",
  LIST_LIKELIHOOD_FAILED: "LIST_LIKELIHOOD_FAILED",

  LIST_CONSEQUENCE_REQUEST: "LIST_CONSEQUENCE_REQUEST",
  LIST_CONSEQUENCE_SUCCESS: "LIST_CONSEQUENCE_SUCCESS",
  LIST_CONSEQUENCE_FAILED: "LIST_CONSEQUENCE_FAILED",

  LIST_ACTUAL_CONSEQUENCE_REQUEST: "LIST_ACTUAL_CONSEQUENCE_REQUEST",
  LIST_ACTUAL_CONSEQUENCE_SUCCESS: "LIST_ACTUAL_CONSEQUENCE_SUCCESS",
  LIST_ACTUAL_CONSEQUENCE_FAILED: "LIST_ACTUAL_CONSEQUENCE_FAILED",

  LIST_RATING_VALUE_REQUEST: "LIST_RATING_VALUE_REQUEST",
  LIST_RATING_VALUE_SUCCESS: "LIST_RATING_VALUE_SUCCESS",
  LIST_RATING_VALUE_FAILED: "LIST_RATING_VALUE_FAILED",

  SAVE_AUDIO_TEMPORARY_REQUEST: "SAVE_AUDIO_TEMPORARY_REQUEST",
  SAVE_AUDIO_TEMPORARY_SUCCESS: "SAVE_AUDIO_TEMPORARY_SUCCESS",

  STORE_STATE_DATA_REQUEST: "STORE_STATE_DATA_REQUEST",
  STORE_STATE_DATA_SUCCESS: "STORE_STATE_DATA_SUCCESS",

  CREATE_MODULE_REQUEST: "CREATE_MODULE_REQUEST",
  CREATE_MODULE_SUCCESS: "CREATE_MODULE_SUCCESS",
  CREATE_MODULE_FAILED: "CREATE_MODULE_FAILED",

  UPLOAD_SCHEDULE_DATA_REQUEST: "UPLOAD_SCHEDULE_DATA_REQUEST",
  UPLOAD_SCHEDULE_DATA_SUCCESS: "UPLOAD_SCHEDULE_DATA_SUCCESS",
  UPLOAD_SCHEDULE_DATA_FAILED: "UPLOAD_SCHEDULE_DATA_FAILED",

  CREATE_TASK_REQUEST: "CREATE_TASK_REQUEST",
  CREATE_TASK_SUCCESS: "CREATE_TASK_SUCCESS",
  CREATE_TASK_FAILED: "CREATE_TASK_FAILED",

  CREATE_MODULE_SUCCESS_OFFLINE: "CREATE_MODULE_SUCCESS_OFFLINE",

  saveDataTemporary: (key, payload, resolve, reject) => ({
    type: actions.SAVE_DATA_TEMPORARY_REQUEST,
    key,
    payload,
    resolve,
    reject
  }),
  listTask: (payload, keyValue, resolve, reject) => ({
    type: actions.LIST_TASK_REQUEST,
    payload,
    meta: {
      retry: true
    },
    keyValue,
    resolve,
    reject
  }),
  listRisk: (payload, keyValue, resolve, reject) => ({
    type: actions.LIST_RISK_REQUEST,
    payload,
    meta: {
      retry: true
    },
    keyValue,
    resolve,
    reject
  }),
  listQuestion: (payload, keyValue, resolve, reject) => ({
    type: actions.LIST_QUESTION_REQUEST,
    payload,
    keyValue,
    meta: {
      retry: true
    },
    resolve,
    reject
  }),

  listLikeliHood: (payload, keyValue, resolve, reject) => ({
    type: actions.LIST_LIKELIHOOD_REQUEST,
    payload,
    keyValue,
    resolve,
    reject
  }),
  listConsequence: (payload, keyValue, resolve, reject) => ({
    type: actions.LIST_CONSEQUENCE_REQUEST,
    payload,
    keyValue,
    resolve,
    reject
  }),
  listActualConsequence: (payload, keyValue, resolve, reject) => ({
    type: actions.LIST_ACTUAL_CONSEQUENCE_REQUEST,
    payload,
    keyValue,
    resolve,
    reject
  }),
  listRatingValue: (payload, keyValue, resolve, reject) => ({
    type: actions.LIST_RATING_VALUE_REQUEST,
    payload,
    keyValue,
    resolve,
    reject
  }),
  saveAudioTemporary: (data, resolve, reject) => ({
    type: actions.SAVE_AUDIO_TEMPORARY_REQUEST,
    data,
    resolve,
    reject
  }),
  createModule: (payload, resolve, reject) => ({
    type: actions.CREATE_MODULE_REQUEST,
    payload,
    meta: {
      retry: true
    },
    resolve,
    reject
  }),
  createTask: (payload, resolve, reject) => ({
    type: actions.CREATE_TASK_REQUEST,
    payload,
    meta: {
      retry: true
    },
    resolve,
    reject
  }),
  uploadScheduleData: (payload, resolve, reject) => ({
    type: actions.UPLOAD_SCHEDULE_DATA_REQUEST,
    payload,
    resolve,
    reject
  })
};

export default actions;
