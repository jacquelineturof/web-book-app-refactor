import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    bookList: [],
    error: null,
    loading: false,
    showRead: false,
    selectedBook: null
}

const actionStart = ( state, action ) => {
    return updateObject( state, { loading: true, error: null } )
}

const actionSuccess = ( state, action ) => {
    return updateObject( state, { bookList: action.payload, error: null, loading: false })
}

const actionFail = ( state, action ) => {
    return updateObject( state, { error: action.payload, loading: false })
}

const showRead = ( state, action ) => {
    return updateObject( state, { showRead: !state.showRead })
}

const setSelectedBook = ( state, action ) => {
    return updateObject( state, { selectedBook: action.payload })
}

const resetSelectedBook = ( state, action ) => {
    return updateObject( state, { selectedBook: null})
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.USERLIST_ACTION_START: return actionStart(state, action)
        case actionTypes.USERLIST_ACTION_SUCCESS: return actionSuccess(state, action)
        case actionTypes.USERLIST_ACTION_FAIL: return actionFail(state, action)
        case actionTypes.USERLIST_SET_FILTER: return showRead(state, action)
        case actionTypes.SET_SELECTED_BOOK: return setSelectedBook( state, action )
        case actionTypes.RESET_SELECTED_BOOK: return resetSelectedBook( state, action )
        default: return state
    }
}

export default reducer