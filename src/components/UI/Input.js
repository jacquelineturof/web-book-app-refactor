import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './Input.module.css'

/*
    UI Input
    @param elementType { string } textarea || select
    @param elementConfig { obj } contains all the regular
    html config for the input
    @param value { any } the value of the input, should correspond to the
    kind of input element
    @changed { func } input change handler.
    @iconConfig { obj } obj containing info about the icon { name, package } = iconConfig
    @touched { boolean } true if user has focused on the input
    @valid { boolean } true if the input entered passes our validity rules
*/
const Input = ({ 
    elementType, 
    elementConfig, 
    value, 
    changed, 
    iconConfig, 
    touched, 
    valid,
    warningMessage 
}) => {
    let inputElement = null
    const inputContainerClasses = [ classes.InputContainer ]

    if (touched && !valid) {
        inputContainerClasses.push(classes.Invalid)
    }

    /*
        Input choices textarea & select
        input will be default
    */
    switch( elementType ) {
        case ( 'select' ):
            inputContainerClasses.push(classes.Select)
            inputElement = (
                <select
                    className = { classes.InputElement }
                    value = { value }
                    onChange = { changed }>
                    { elementConfig.options.map(option => (
                        <option key = { option.value } value = { option.value }>
                            { option.displayValue }
                        </option>
                    ))}
                </select>
            )
            break
        case ( 'textarea' ):
            inputContainerClasses.push(classes.TextArea)
            inputElement = (
                <textarea
                    className = { classes.InputElement }
                    value = { value }
                    onChange = { changed }
                    { ...elementConfig }>
                </textarea>
            )
            break
        default: 
            inputElement = (
                <input
                    className = { classes.InputElement }
                    value = { value }
                    onChange = { changed }
                    { ...elementConfig } />
            )
    }

    const icon = iconConfig 
        ? (
            <FontAwesomeIcon 
                icon = { [ iconConfig.package, iconConfig.name ] } 
                className = { classes.Icon } /> 
        )
        : null
    
    return (
        <div className = { classes.MessageContainer }>
            <div className = { inputContainerClasses.join(' ') }>
                { icon }
                { inputElement }
            </div>
            {   
                touched && !valid 
                    ? (
                        <p className = { classes.WarningMessage }>
                            { warningMessage }
                        </p>
                    ) 
                    : null
            }
        </div>

    )
}

export default Input