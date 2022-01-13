import { combineReducers } from "redux";
import authReducer from "../../Auth/redux/reducer";
import mainReducer from "../../Main/redux/reducer";
import documentReducer from "../../Document/redux/reducer";
import { reducer as network } from "react-native-offline";
import reportReducer from "../../Report/redux/reducer";

const appReducer = combineReducers({
  Auth: authReducer,
  Main: mainReducer,
  network,
  Report: reportReducer,
  Document: documentReducer
});

export default appReducer;

// export default (state, action) => {
//   // if (action.type === "USER_LOGOUT") {
//   //   state = undefined;
//   // }
//   return appReducer(state, action);
// };
