import React from 'react'

import Button from './UI/Button'

import classes from './LandingPage.module.css'

const Heading = ({ history }) => (
    <div className = { classes.Heading }>
        <h1 className = { classes.MainHeading }>logicshelf</h1>
        <h3 className = { classes.SubHeading }>
            Your digital book shelf and search engine.
        </h3>
        <Button 
            clicked = { () => history.push('/auth') }
            type = "Flat">
            Join/Login
        </Button>
    </div>
)

const Landing = ({ history }) => (
    <section className = { classes.Landing }>
        <Heading history = { history } />
    </section>
)

export default Landing