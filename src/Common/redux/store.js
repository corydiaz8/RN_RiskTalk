import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createNetworkMiddleware } from "react-native-offline";
import reducers from "./reducers";
import sagas from "./sagas";

export default function createReduxStore({ queueReleaseThrottle = 1000 } = {}) {
  const networkMiddleware = createNetworkMiddleware({
    queueReleaseThrottle
  });
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [networkMiddleware, sagaMiddleware];

  const store = createStore(reducers, applyMiddleware(...middlewares));

  sagaMiddleware.run(sagas);

  return store;
}
