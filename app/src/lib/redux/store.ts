/* import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

const store = createStore(rootReducer, applyMiddleware(logger)); */

import { createStore } from "redux";

import rootReducer from "./root-reducer.ts";

const store = createStore(rootReducer);

export default store;
