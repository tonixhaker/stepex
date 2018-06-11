import * as types from './types';
import { STATE_STATUSES } from '../../share/constants';
import {error, success} from "redux-saga-requests";


const initialState = {
    from_text:'',
    to_text:'',
    from_lang:'auto',
    to_lang:'eng',
    status: STATE_STATUSES.READY,
    exception: {
        message: null,
        errors: {}
    }
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.TRANSLATE: {
            return processReducer(state);
        }
        case success(types.TRANSLATE) : {
            return {...state, status: STATE_STATUSES.READY, to_text:action.payload.data.to_text}
        }
        case error(types.TRANSLATE) : {
            return errorReducer(action.payload.response.data);
        }


        case  types.SET_FROM_LANG:{
            return {...state, from_lang:action.payload.data};
        }

        case  types.SET_TO_LANG:{
            return {...state, to_lang:action.payload.data};
        }

        case  types.SET_FROM_TEXT:{
            return {...state, from_text:action.payload.data};
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