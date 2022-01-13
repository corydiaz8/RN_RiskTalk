const actions = {
  LIST_ACTIVITY_REQUEST: "LIST_ACTIVITY_REQUEST",
  LIST_ACTIVITY_SUCCESS: "LIST_ACTIVITY_SUCCESS",
  LIST_ACTIVITY_FAILED: "LIST_ACTIVITY_FAILED",

  SINGLE_ACTIVITY_REQUEST: "SINGLE_ACTIVITY_REQUEST",
  SINGLE_ACTIVITY_SUCCESS: "SINGLE_ACTIVITY_SUCCESS",
  SINGLE_ACTIVITY_FAILED: "SINGLE_ACTIVITY_FAILED",

  SAVE_AMENDADDITIONAL_REQUEST: "SAVE_AMENDADDITIONAL_REQUEST",
  SAVE_AMENDADDITIONAL_SUCCESS: "SAVE_AMENDADDITIONAL_SUCCESS",
  SAVE_AMENDADDITIONAL_FAILED: "SAVE_AMENDADDITIONAL_FAILED",

  CREATE_AMENDADDITIONAL_REQUEST: "CREATE_AMENDADDITIONAL_REQUEST",
  CREATE_AMENDADDITIONAL_SUCCESS: "CREATE_AMENDADDITIONAL_SUCCESS",
  CREATE_AMENDADDITIONAL_FAILED: "CREATE_AMENDADDITIONAL_FAILED",

  LIST_AMENDADDITIONAL_REQUEST: "LIST_AMENDADDITIONAL_REQUEST",
  LIST_AMENDADDITIONAL_SUCCESS: "LIST_AMENDADDITIONAL_SUCCESS",
  LIST_AMENDADDITIONAL_FAILED: "LIST_AMENDADDITIONAL_FAILED",

  listActivity: (payload, keyValue, resolve, reject) => ({
    type: actions.LIST_ACTIVITY_REQUEST,
    payload,
    meta: {
      retry: true
    },
    keyValue,
    resolve,
    reject
  }),
  singleActivity: (payload, resolve, reject) => ({
    type: actions.SINGLE_ACTIVITY_REQUEST,
    payload,
    meta: {
      retry: true
    },
    resolve,
    reject
  }),
  saveAmendAdditional: (payload, resolve, reject) => ({
    type: actions.SAVE_AMENDADDITIONAL_REQUEST,
    payload,
    resolve,
    reject
  }),
  createAmendAdditional: (payload, resolve, reject) => ({
    type: actions.CREATE_AMENDADDITIONAL_REQUEST,
    payload,
    resolve,
    reject
  }),
  listAmendAdditional: (payload, resolve, reject) => ({
    type: actions.LIST_AMENDADDITIONAL_REQUEST,
    payload,
    resolve,
    reject
  })
};

export default actions;
