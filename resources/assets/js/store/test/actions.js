import * as types from './types';

export const nextWord = (uid) => ({
    type: types.NEXT,
    payload: {
        request: {
            method: 'post',
            url: `api/get_next`,
            data: {'uid':uid}
        }
    }
});


export const checkWord = (uid, answer) => ({
    type: types.CHECK_WORD,
    payload: {
        request: {
            method: 'post',
            url: `api/check_word`,
            data: {'uid':uid, 'answer':answer}
        }
    }
});
