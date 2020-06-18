import * as actionTypes from './actionTypes'

import axios from '../../axios-backend'

/*
    BOOK LIST OPERATIONS
*/
export const userListSetFilter = () => {
    return {
        type: actionTypes.USERLIST_SET_FILTER
    }
}

export const userListActionStart = () => {
    return {
        type: actionTypes.USERLIST_ACTION_START
    }
}

export const userListActionSuccess = userBookList => {
    return {
        type: actionTypes.USERLIST_ACTION_SUCCESS,
        payload: userBookList
    }
}

export const userListActionFail = error => {
    return {
        type: actionTypes.USERLIST_ACTION_FAIL,
        payload: error
    }
}

/*
    Set book selected for an action.
*/
export const setSelected = bookSelection => {
    return {
        type: actionTypes.SET_SELECTED_BOOK,
        payload: bookSelection
    }
}

export const resetSelected = () => {
    return {
        type: actionTypes.RESET_SELECTED_BOOK
    }
}

/*
    AJAX calls to backend CRUD operations.
    Each call requires an auth token
*/
export const getBookList = token => {
    return async dispatch => {
        const config = {
            headers: {
                'x-auth': token
            }
        }

        try {
            const response = await axios.get('book', config)
            if (!response) throw new Error('Could not retrieve booklist!')
            dispatch(userListActionSuccess(response.data.bookList))
        } catch (e) {
            dispatch(userListActionFail(e.message))
        }
    }
}

export const addBook = (book, token) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'x-auth': token
                }
            }

            const response = await axios.post('book', { ...book }, config)
            if (!response) throw new Error('Error adding book to list!')
            dispatch(userListActionSuccess(response.data.bookList))
        } catch (e) {
            dispatch(userListActionFail(e.message))
        }
    }
}

export const deleteBook = (bookID, token) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'x-auth': token
                }
            }

            const response = await axios.delete(`book/${bookID}`, config)
            if (!response) throw new Error('Error deleting book from list!')
            dispatch(userListActionSuccess(response.data.bookList))
        } catch (e) {
            dispatch(userListActionFail(e.message))
        }
    }
}

export const updateBook = (bookID, token) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'x-auth': token
                }
            }

            const response = await axios.put(`book/read/${bookID}`, null, config)
            if (!response) throw new Error('Error updating book read status.')
            dispatch(userListActionSuccess(response.data.bookList))
        } catch (e) {
            dispatch(userListActionFail(e.message))
        }
    }
}