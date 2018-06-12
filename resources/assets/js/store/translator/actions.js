import * as types from './types';

export const getTranslate = () => (dispatch, getState) => {
    return dispatch({
        type: types.TRANSLATE,
        payload: {
            request: {
                method: 'post',
                url: `api/get_translation`,
                data: getState().translator
            }
        }
    })
};

export const getLangsList = () => (dispatch) => {
    return dispatch({
        type: types.LANGS,
        payload: {
            request: {
                method: 'get',
                url: `api/get_langs_list`
            }
        }
    })
};

export const setFromLang = (data) => ({
    type: types.SET_FROM_LANG,
    payload: {
        data: data
    }
});

export const setToLang = (data) => ({
    type: types.SET_TO_LANG,
    payload: {
        data: data
    }
});

export const setFromText = (data) => ({
    type:types.SET_FROM_TEXT,
    payload:{
        data: data
    }
});