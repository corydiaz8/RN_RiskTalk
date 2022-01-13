import actions from "./action";

const initState = {
  listActivityLoading: false,
  listActivities: [],
  singleActivityLoading: false,
  singleActivity: {},
  saveAmendAdditionalLoading: false,
  saveAmendAdditionals: [],
  listAmendAdditionalInfos: [],
  listAmendAdditionalInfoLoading: false,
  createAmendAdditionalInfoLoading: false
};

export default function reportReducer(state = initState, action) {
  switch (action.type) {
    case actions.LIST_ACTIVITY_REQUEST:
      return {
        ...state,
        listActivityLoading: true
      };

    case actions.LIST_ACTIVITY_SUCCESS:
      return {
        ...state,
        listActivities: action.response,
        listActivityLoading: false
      };

    case actions.LIST_ACTIVITY_FAILED:
      return {
        ...state,
        listActivityLoading: false
      };

    case actions.SINGLE_ACTIVITY_REQUEST:
      return {
        ...state,
        singleActivityLoading: true
      };

    case actions.SINGLE_ACTIVITY_SUCCESS:
      return {
        ...state,
        singleActivity: action.response,
        singleActivityLoading: false
      };

    case actions.SINGLE_ACTIVITY_FAILED:
      return {
        ...state,
        singleActivityLoading: false
      };

    case actions.SAVE_AMENDADDITIONAL_REQUEST:
      return {
        ...state,
        saveAmendAdditionalLoading: true
      };

    case actions.SAVE_AMENDADDITIONAL_SUCCESS:
      return {
        ...state,
        saveAmendAdditionals: action.response,
        saveAmendAdditionalLoading: false
      };

    case actions.SAVE_AMENDADDITIONAL_FAILED:
      return {
        ...state,
        saveAmendAdditionalLoading: false
      };

    case actions.CREATE_AMENDADDITIONAL_REQUEST:
      return {
        ...state,
        createAmendAdditionalInfoLoading: true
      };

    case actions.CREATE_AMENDADDITIONAL_SUCCESS:
      return {
        ...state,
        createAmendAdditionalInfoLoading: false
      };

    case actions.CREATE_AMENDADDITIONAL_FAILED:
      return {
        ...state,
        createAmendAdditionalInfoLoading: false
      };

    case actions.LIST_AMENDADDITIONAL_REQUEST:
      return {
        ...state,
        listAmendAdditionalInfoLoading: true
      };

    case actions.LIST_AMENDADDITIONAL_SUCCESS:
      return {
        ...state,
        listAmendAdditionalInfos: action.response,
        listAmendAdditionalInfoLoading: false
      };

    case actions.LIST_AMENDADDITIONAL_FAILED:
      return {
        ...state,
        listAmendAdditionalInfoLoading: false
      };

    default:
      return state;
  }
}
