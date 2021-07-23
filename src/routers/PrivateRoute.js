import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header';
import LoadingPage from '../components/LoadingPage';
import { UserContext } from '../contexts/user-context'
import { DateContext } from '../contexts/date-context'
import { firebase, googleAuthProvider } from '../firebase/firebase'
import { initializeCalendar } from '../actions/calendarUpdatingFuncs';

export const PrivateRoute = ({  
                                component: Component,
                                ...rest
                            }) => 
    {
        const { dateState } = useContext(DateContext)
        let { calendar } = dateState




        const [ state, login, logout ] = useContext(UserContext)
        const { uid } = state 
        return (
            <Route {...rest} component={(props) => (
                uid ? (
                    <div>
                        <Header />

                        <Component {...props}/>
                    </div>
                ) : (
                    <Redirect to="/" />
                )
            )}/>
        )
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute)