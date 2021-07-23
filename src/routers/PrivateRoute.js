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

        const { dateState, setCalendar } = useContext(DateContext)
        const { calendar } = dateState 
        console.log('private route has the calendar')
        console.log(calendar)

        const [ state, login, logout ] = useContext(UserContext)
        const { uid } = state 
        console.log('private route has this uid')
        console.log(uid)

        // this makes it so if someone refreshes while logged in, the uid is set again so it wont be lost
        firebase.auth().onAuthStateChanged((user) => {
            if (state.uid === ''){
                login(user.uid)
            }
        })

        // again, if a refresh happens, the private route still have calendar 
        firebase.database().ref(`users/${uid}/calendar`).once('value', (snapshot) => {
            if (snapshot.exists()){
                setCalendar(snapshot.val())
            } else {
                setCalendar(initializeCalendar())
            }
        })

        return (
            (Object.keys(calendar).length === 0) ? 
            <LoadingPage /> :

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