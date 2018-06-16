import { createStore, applyMiddleware,combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import thunk from 'redux-thunk';
import saga from './saga';

import user from "./user/reducer";
import statistic from "./statistic/reducer";
import words from "./words/reducer";
import translator from "./translator/reducer";
import learn_new_words from "./learn_new_words/reducer";

const appReducers = combineReducers({
    user,
    statistic,
    words,
    translator,
    learn_new_words
});

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(appReducers, applyMiddleware(thunk, thunkMiddleware, sagaMiddleware,loggerMiddleware));

sagaMiddleware.run(saga);

export default store;