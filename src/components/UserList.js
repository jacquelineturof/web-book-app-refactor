import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import classes from './UserList.module.css'

/*
    User's saved book list. AJAX call to backend db.
    Will display list in a flex box of cards.

    User has controls to see book read/not read/all
*/
const UserList = () => {
    const dispatch = useDispatch() // form control functions
    // if we have results from the google api show BookResults component.
    const token = useSelector(state => state.auth.token)
    const loading = useSelector(state => state.bookList.loading)

    // selected for deletion
    const selectedBook = useSelector(state => state.bookList.selectedBook)

    /*
        USER BOOK LIST STATE
    */
    const bookList = useSelector(state => state.bookList.bookList)
    // state to filter bookList
    const [ filterType, setFilterType ] = useState('all') // default filter is all

    return (
        <section className = { classes.UserList }>
            List
        </section>
    )
}

export default UserList