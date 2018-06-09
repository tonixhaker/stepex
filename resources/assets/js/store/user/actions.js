import * as types from './types';


export const getItem = (uid) => ({
    type: types.GET,
    payload: {
        request: {
            method: 'post',
            url: `api/get_current_user`,
            data: {'uid':uid}
        }
    }
});

export const test = () => ({
    type:types.DEFAULT,
    payload:{
        text:"text"
    }
});