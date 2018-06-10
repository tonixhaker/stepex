import { createStore, applyMiddleware,combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';

import user from "./user/reducer";
import statistic from "./statistic/reducer";
import words from "./words/reducer";

const appReducers = combineReducers({
    user,
    statistic,
    words,
});

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(appReducers, applyMiddleware(sagaMiddleware,loggerMiddleware));

sagaMiddleware.run(saga);

export default store;