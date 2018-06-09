import { createStore, applyMiddleware,combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import user from "./user/reducer"

const appReducers = combineReducers({
    user
});

const loggerMiddleware = createLogger();
const store = createStore(appReducers, applyMiddleware(loggerMiddleware));


export default store;