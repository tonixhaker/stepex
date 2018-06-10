import * as types from './types';


export const getLearnedWords = (uid) => ({
    type: types.GET,
    payload: {
        request: {
            method: 'post',
            url: `api/get_learned_words`,
            data: {'uid':uid}
        }
    }
});

export const getNotLearnedWords = (uid) => ({
    type: types.GET,
    payload: {
        request: {
            method: 'post',
            url: `api/get_not_learned_words`,
            data: {'uid':uid}
        }
    }
});