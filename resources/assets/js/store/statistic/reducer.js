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

const rating = {
    false_answers:0,
    same_rating:0,
    tests_count:0,
    total_users_count:0,
    total_words_count:0,
    totalrating:0,
    true_answers:0,
    users_dumber:0,
    users_smarter:0,
    words_count:0
};

const initialState = {
    uid: getCookieId('tg_user'),
    rating: [],
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
            return {...state, status: STATE_STATUSES.READY, rating: {...rating, ...action.payload.data}}
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