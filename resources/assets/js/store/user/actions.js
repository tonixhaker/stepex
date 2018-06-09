import * as types from './types';

export const getItem = () => ({
    type: types.GET,
    payload: {
        request: {
            method: 'get',
            url: `http://127.0.0.1:9000/get_current_user`
        }
    }
});

export const test = () => ({
    type:types.DEFAULT,
    payload:{
        text:"text"
    }
});