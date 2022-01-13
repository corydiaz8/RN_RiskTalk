import actions from "./action";

const initState = {
  temporaryData: {},
  taskLoading: false,
  tasks: [],
  riskLoading: false,
  risks: [],
  questions: [],
  questionLoading: false,
  consequences: [],
  consequenceLoading: false,
  actualConsequences: [],
  actualConsequenceLoading: false,
  listLikeliHoodLoading: false,
  listLikeliHoods: [],
  listRatingValueLoading: false,
  listRatingValues: [],
  temporaryAudioData: [],
  createModuleLoading: false,
  createModuleStatus: "pending",
  loadingCreateTask: false
};

export default function mainReducer(state = initState, action) {
  switch (action.type) {
    case actions.SAVE_DATA_TEMPORARY_SUCCESS:
      return {
        ...state,
        temporaryData: action.response
      };
    case actions.LIST_TASK_REQUEST:
      return {
        ...state,
        taskLoading: true
      };

    case actions.LIST_TASK_SUCCESS:
      return {
        ...state,
        tasks: action.response,
        taskLoading: false
      };

    case actions.LIST_TASK_FAILED:
      return {
        ...state,
        taskLoading: false
      };

    case actions.LIST_RISK_REQUEST:
      return {
        ...state,
        riskLoading: true
      };

    case actions.LIST_RISK_SUCCESS:
      const risks = action.response && action.response.length > 0 ? action.response : state.risks;
      return {
        ...state,
        risks: risks,
        riskLoading: false
      };

    case actions.LIST_RISK_FAILED:
      return {
        ...state,
        riskLoading: false
      };

    case actions.LIST_QUESTION_REQUEST:
      return {
        ...state,
        questionLoading: true
      };

    case actions.LIST_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.response,
        questionLoading: false
      };

    case actions.LIST_QUESTION_FAILED:
      return {
        ...state,
        questionLoading: false
      };

    case actions.LIST_CONSEQUENCE_REQUEST:
      return {
        ...state,
        consequenceLoading: true
      };

    case actions.LIST_CONSEQUENCE_SUCCESS:
      return {
        ...state,
        consequences: action.response,
        consequenceLoading: false
      };

    case actions.LIST_CONSEQUENCE_FAILED:
      return {
        ...state,
        consequenceLoading: false
      };

    case actions.LIST_ACTUAL_CONSEQUENCE_REQUEST:
      return {
        ...state,
        actualConsequenceLoading: true
      };

    case actions.LIST_ACTUAL_CONSEQUENCE_SUCCESS:
      return {
        ...state,
        actualConsequences: action.response,
        actualConsequenceLoading: false
      };

    case actions.LIST_ACTUAL_CONSEQUENCE_FAILED:
      return {
        ...state,
        actualConsequenceLoading: false
      };

    case actions.LIST_LIKELIHOOD_REQUEST:
      return {
        ...state,
        listLikeliHoodLoading: true
      };

    case actions.LIST_LIKELIHOOD_SUCCESS:
      return {
        ...state,
        listLikeliHoods: action.response,
        listLikeliHoodLoading: false
      };

    case actions.LIST_LIKELIHOOD_FAILED:
      return {
        ...state,
        listLikeliHoodLoading: false
      };

    case actions.LIST_RATING_VALUE_REQUEST:
      return {
        ...state,
        listRatingValueLoading: true
      };

    case actions.LIST_RATING_VALUE_SUCCESS:
      return {
        ...state,
        listRatingValues: action.response || [],
        listRatingValueLoading: false
      };

    case actions.LIST_RATING_VALUE_FAILED:
      return {
        ...state,
        listRatingValueLoading: false
      };

    case actions.SAVE_AUDIO_TEMPORARY_SUCCESS:
      return {
        ...state,
        temporaryAudioData: action.response
      };
    case actions.CREATE_MODULE_REQUEST:
      return {
        ...state,
        createModuleLoading: true
      };
    case actions.CREATE_MODULE_SUCCESS:
      return {
        ...state,
        createModuleLoading: false,
        createModuleStatus: "success",
        temporaryAudioData: [],
        temporaryData: {
          ...state.temporaryData,
          selectName: undefined,
          upload_files: []
        }
      };
    case actions.CREATE_MODULE_FAILED:
      return {
        ...state,
        createModuleLoading: false
      };

    case actions.CREATE_MODULE_SUCCESS_OFFLINE:
      return {
        ...state,
        createModuleStatus: action.response
      };

    case actions.CREATE_TASK_REQUEST:
      return {
        ...state,
        loadingCreateTask: true
      };

    case actions.CREATE_TASK_SUCCESS:
      return {
        ...state,
        loadingCreateTask: false
      };

    case actions.CREATE_TASK_FAILED:
      return {
        ...state,
        loadingCreateTask: false
      };

    default:
      return state;
  }
}
