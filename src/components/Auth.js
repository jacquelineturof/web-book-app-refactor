import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { checkValidity } from '../shared/utility'

import Input from './UI/Input'
import Button from './UI/Button'

import * as actions from '../store/actions'

import classes from './Auth.module.css'

/*
    UI on bottom of form for user to change the type of form they're viewing.
*/
const ChangeForm = ({ isLogin, setFormType }) => (
    <div className = { classes.ChangeFormContainer }>
        <p className = { classes.ChangFormTag }>
            { isLogin ? 'Need to create account?' :  'Already have an account?' }
        </p>
        <Button clicked = { setFormType }>
            { isLogin ? 'Register' : 'Login '}
        </Button>
    </div>
)

const Auth = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    // form state
    const [ formType, setFormType] = useState('login')

    /*
        Form Inputs
    */
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    /*
        Form Inputs Validity States
    */
    const [ isEmailTouched, setIsEmailTouched ] = useState(false)
    const [ isEmailValid, setIsEmailValid ] = useState(false)
    const [ isPasswordTouched, setIsPasswordTouched ] = useState(false)
    const [ isPasswordValid, setIsPasswordValid ] = useState(false)
    const [ isConfirmTouched, setIsConfirmTouched ] = useState(false)
    const [ isConfirmValid, setIsConfirmValid ] = useState(false)

    const inputChangedHandler = (fieldName, value) => {
        const emailValidityRules = {
            required: true,
            isEmail: true
        }

        const passwordValidityRules = {
            required: true,
            minLength: 6
        }

        if (fieldName === 'email') {
            setIsEmailTouched(true)
            const isValidEmail = checkValidity(value, emailValidityRules)
            setIsEmailValid(isValidEmail)
            setEmail(value)
        } else if (fieldName === 'password') {
            setIsPasswordTouched(true)
            const isValidPassword = checkValidity(value, passwordValidityRules)
            setIsPasswordValid(isValidPassword)
            setPassword(value)
        } else {
            setIsConfirmTouched(true)
            const isValidConfirm = 
                checkValidity(value, passwordValidityRules) && password === value
            setIsConfirmValid(isValidConfirm)
            setConfirmPassword(value)
        }
    }

    /*
        Input Config
    */
    const EMAIL_CONFIG = {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Email'
        },
        iconConfig: {
            name: 'at',
            package: 'fal'
        },
        value: email,
        changed: e => inputChangedHandler('email', e.target.value),
        touched: isEmailTouched,
        valid: isEmailValid,
        warningMessage: 'Must be valid email.'
    }

    const PASSWORD_CONFIG = {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        iconConfig: {
            name: 'lock-alt',
            package: 'fal'
        },
        value: password,
        changed: e => inputChangedHandler('password', e.target.value),
        touched: isPasswordTouched,
        valid: isPasswordValid,
        warningMessage: 'Password must be six characters minimum.'
    }

    const CONFIRM_PASSWORD_CONFIG = {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Confirm Password'
        },
        iconConfig: {
            name: 'check',
            package: 'fal'
        },
        value: confirmPassword,
        changed: e => inputChangedHandler('confirm', e.target.value),
        touched: isConfirmTouched,
        valid: isConfirmValid,
        warningMessage: 'Passwords do not match!'
    }

    let forgotPassword = null

    if (formType !== 'forgot') {
        forgotPassword = (
            <Button type = "Forgot" clicked = { () => setFormType('forgot')}>
                Forgot Password?
            </Button>
        )
    }

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    /* 
        Validate input before making ajax call to backend for auth token. 
    */
    const submitHandler = e => {
        e.preventDefault()

        if (formType === 'login' || formType === 'register') {
            const isSignup = formType === 'login' ? false : true
        
            if (isEmailValid && isPasswordValid) {
                if (isSignup && password !== confirmPassword) {
                dispatch(actions.authFail('Password fields do not match!'))
                } else {
                    dispatch(actions.auth( email, password, isSignup ))
                }
            }
        }
    
        if (formType === 'forgotPassword') {
            dispatch(actions.accountRecovery(email))
        }

        resetForm()
    }

    /*
        If we have an auth token. Route away to main page
    */
    if (token) return <Redirect to ="/list" />

    return (
        <section className = { classes.Auth }>
            <form className = { classes.Form } onSubmit = { submitHandler }>
                <Input { ...EMAIL_CONFIG } />
                { formType !== 'forgot' ? <Input { ...PASSWORD_CONFIG } /> : null }
                { formType === 'register' ? <Input { ...CONFIRM_PASSWORD_CONFIG }/> : null }
                { forgotPassword }
                <Button isSubmit = { true } type = "Submit">
                    Submit
                </Button>
                { 
                    formType !== 'forgot' 
                        ? (
                            <ChangeForm 
                                isLogin = { formType === 'login' }
                                setFormType = { formType === 'login' 
                                    ? () => setFormType('register') 
                                    : () => setFormType('login')
                                } />
                        )
                        : null 
                }
            </form>
        </section>
    )
}

export default Auth 