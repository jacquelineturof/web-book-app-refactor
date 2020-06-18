import React from 'react'

import classes from './Button.module.css'

/*
    Button UI.
    Props: 
    @children -> will hold label for our button
    @type -> determines the css class
    @isSubmit -> is a boolean true -> submit button
    @clicked => hold a reference to our click listener function,
    only used if isSubmit is false.
    @disabled { boolean } true if button should be disabled
*/
export default function Button({ children, type, isSubmit, clicked, disabled }) {
    return (
        <button
            type = { isSubmit ? 'submit' : 'button' } 
            className = { [ classes.Button, classes[type] ].join(' ')}
            onClick = { isSubmit ? null : clicked }
            disabled = { disabled }>
            { children }
        </button>
    )
}