import * as types from './types';
import { STATE_STATUSES } from '../../share/constants';
import {error, success} from "redux-saga-requests";

const item = {
    id: "qweqweqweqweqweqweqweqweqweqweqweqweqweqweqwe"
};

const initialState = {
    item: item,
    status: STATE_STATUSES.READY,
    exception: {
        message: null,
        errors: {}
    }
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.DEFAULT: {
            console.log(action.payload.text)
        }
        break;

        case types.GET: {
            return processReducer(state);
        }
        case success(types.GET) : {
            return {...state, status: STATE_STATUSES.READY, item: {...item, ...action.payload.data}}
        }
        case error(types.GET) : {
            return errorReducer(action.payload.response.data);
        }

        default:
            return state;
    }
};

const errorReducer = (exception) => ({
    ...initialState,
    status: STATE_STATUSES.ERROR,
    exception: {
        errors: {...exception.errors},
        message: {...exception.message},
    }
});

const processReducer = (state = initialState) => ({
    ...state,
    status: STATE_STATUSES.PENDING,
    exception: { ...initialState.exception }
});