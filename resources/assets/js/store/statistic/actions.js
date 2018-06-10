import * as types from './types';


export const getItem = (uid) => ({
    type: types.GET,
    payload: {
        request: {
            method: 'post',
            url: `api/get_current_rating`,
            data: {'uid':uid}
        }
    }
});