import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header';
import LoadingPage from '../components/LoadingPage';
import { UserContext } from '../contexts/user-context'
import { DateContext } from '../contexts/date-context'
import { firebase, googleAuthProvider } from '../firebase/firebase'
import { initializeCalendar } from '../actions/calendarUpdatingFuncs';
import { history } from '../routers/AppRouter'

export const PrivateRoute = ({  
                                component: Component,
                                ...rest
                            }) => 
    {

        const { dateState, setCalendar } = useContext(DateContext)
        const { calendar } = dateState 


        const [ state, login, logout ] = useContext(UserContext)
        const { uid } = state 


        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user){
        //     } else {
        //         logout()
        //         setCalendar({})

        //         // history.push('/')
        //     }
        // })

        return (
            <Route {...rest} component={(props) => (
                uid ? (
                    <div>
                        {/* <div style={{color: 'white'}}>found uid</div> */}
                        <Header />
                        
                        <Component {...props}/>
                    </div>
                ) : (
                    <Redirect to="/" />
                    // <div style={{color: 'white'}}> MISSING UId</div>

                )
            )}/>
        )
}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute)