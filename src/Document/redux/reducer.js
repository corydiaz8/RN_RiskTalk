import actions from "./action";

const initState = {
  loadingListDocument: false,
  listDocuments: []
};

export default function documentReducer(state = initState, action) {
  switch (action.type) {
    case actions.LIST_DOCUMENT_REQUEST:
      return {
        ...state,
        loadingListDocument: true
      };

    case actions.LIST_DOCUMENT_SUCCESS:
      return {
        ...state,
        listDocuments: action.response,
        loadingListDocument: false
      };

    case actions.LIST_DOCUMENT_FAILED:
      return {
        ...state,
        loadingListDocument: false
      };
    default:
      return state;
  }
}
