import * as types from './types';

export const getWord = (uid) => ({
    type: types.GET,
    payload: {
        request: {
            method: 'post',
            url: `api/get_random_word`,
            data: {'uid':uid}
        }
    }
});
