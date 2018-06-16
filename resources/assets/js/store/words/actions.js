import * as types from './types';
import { makeQueryString } from '../../utils/helpers';

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


export const setPagination = (data) => ({
    type: types.PAGINATION,
    payload: {
        data: data
    }
});

export const setFilters = (data) => ({
    type: types.FILTERS,
    payload: {
        data: data
    }
});


export const getItems = (data) => (dispatch, getState) => {
    const currentState = getState();
    const paginationString = makeQueryString(currentState.words.pagination);
    const filtersString = makeQueryString(currentState.words.filters);
    let searchString = currentState.words.searchString;

    let queryParts = [];
    if(paginationString) {
        queryParts.push(paginationString);
    }
    if(filtersString) {
        queryParts.push(filtersString);
    }
    if(searchString) {
        queryParts.push(searchString);
    }
    return dispatch({
        type: types.PAGINATION_LIST,
        payload: {
            request: {
                method: 'post',
                url: `api/get_not_learned_words_page?${queryParts.join('&')}`,
                data: data
            }
        }
    })
};


export const getItemsLearned = (data) => (dispatch, getState) => {
    const currentState = getState();
    const paginationString = makeQueryString(currentState.words.pagination);
    const filtersString = makeQueryString(currentState.words.filters);
    let searchString = currentState.words.searchString;

    let queryParts = [];
    if(paginationString) {
        queryParts.push(paginationString);
    }
    if(filtersString) {
        queryParts.push(filtersString);
    }
    if(searchString) {
        queryParts.push(searchString);
    }
    return dispatch({
        type: types.PAGINATION_LIST,
        payload: {
            request: {
                method: 'post',
                url: `api/get_learned_words_page?${queryParts.join('&')}`,
                data: data
            }
        }
    })
};

export const forgetWord = (word,user) => ({
    type: types.FORGET,
    payload: {
        request: {
            method: 'post',
            url: `api/forget_word`,
            data: {'word_id':word, 'user_id':user}
        }
    }
});

export const learnWord = (word,user) => ({
    type: types.LEARN,
    payload: {
        request: {
            method: 'post',
            url: `api/learn_word`,
            data: {'word_id':word, 'uid':user}
        }
    }
});