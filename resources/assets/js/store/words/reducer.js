import * as types from './types';
import { STATE_STATUSES } from '../../share/constants';
import {error, success} from "redux-saga-requests";


function getCookie(name){
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getCookieId(name){
    return JSON.parse(getCookie(name)).id
}
const words = [];
const initialState = {
    uid: getCookieId('tg_user'),
    words: words,
    pagination: {
        current: 10,
        pageSize: 1
    },
    filters:'',
    status: STATE_STATUSES.READY,
    exception: {
        message: null,
        errors: {}
    }
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.GET: {
            return processReducer(state);
        }
        case success(types.GET) : {
            return {...state, status: STATE_STATUSES.READY, words: {...words, ...action.payload.data}}
        }
        case error(types.GET) : {
            return errorReducer(action.payload.response.data);
        }


        case types.PAGINATION:{
            return {...state, pagination:{...action.payload.data}}
        }

        case types.PAGINATION_LIST: {
            return processReducer(state);
        }
        case success(types.PAGINATION_LIST) : {
            return {...state, status: STATE_STATUSES.READY, words: {...words, ...action.payload.data}}
        }
        case error(types.PAGINATION_LIST) : {
            return errorReducer(state, action.payload.response.data);
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