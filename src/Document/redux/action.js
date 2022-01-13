const actions = {
  LIST_DOCUMENT_REQUEST: "LIST_DOCUMENT_REQUEST",
  LIST_DOCUMENT_SUCCESS: "LIST_DOCUMENT_SUCCESS",
  LIST_DOCUMENT_FAILED: "LIST_DOCUMENT_FAILED",

  listDocument: (payload, resolve, reject) => ({
    type: actions.LIST_DOCUMENT_REQUEST,
    payload,
    resolve,
    reject
  })
};
export default actions;
