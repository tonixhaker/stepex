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

const initialState = {
    uid: getCookieId('tg_user'),
    word: '',
    fakes:[],
    count:0,
    percent:null,
    user_status:'',
    not_enough_words:true,
    previous_answer_status:'success',
    status: STATE_STATUSES.READY,
    exception: {
        message: null,
        errors: {}
    }
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.NEXT: {
            return processReducer(state);
        }
        case success(types.NEXT) : {
            return {...state, status: STATE_STATUSES.READY,
                ...action.payload.data}
        }
        case error(types.NEXT) : {
            return {...state, status: STATE_STATUSES.READY, not_enough_words:true}
        }


        case types.CHECK_WORD: {
            return processReducer(state);
        }
        case success(types.CHECK_WORD) : {
            return {...state, status: STATE_STATUSES.READY,
                previous_answer_status:action.payload.data.previous_answer_status,
                percent:action.payload.data.percent}
        }
        case error(types.CHECK_WORD) : {
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