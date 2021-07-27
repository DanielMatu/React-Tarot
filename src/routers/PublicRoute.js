import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../contexts/user-context'
import { DateContext } from '../contexts/date-context'
import { firebase } from '../firebase/firebase'
import AppRouter, { history } from '../routers/AppRouter'
import { initializeCalendar } from '../actions/calendarUpdatingFuncs'


export const PublicRoute = ({ 
    component: Component,
    ...rest
}) => {
    const [ state, login, logout ] = useContext(UserContext)
    const { uid } = state 

    let { dateState, setCalendar } = useContext(DateContext)
    let { calendar } = dateState
    let newCalendar

    firebase.auth().onAuthStateChanged((user) => {
        console.log('login page triggered onauth')
        if (user){
            console.log('theres a user')
            // update the state to know what the uid is
            console.log('setting uid state with login')
            login(user.uid)


            // set the user in the database if there isnt one
            firebase.database().ref(`users/${user.uid}`).once('value', (snapshot) => {
                if (snapshot.exists()){
                } else {
                    firebase.database().ref(`users/${user.uid}`).set({})
                }
            })


            // read calendar from database and set calendar in state
            firebase.database().ref(`users/${user.uid}/calendar`).once('value', (snapshot) => {
                if (calendar){
                    if (Object.keys(calendar).length === 0){
                        if (snapshot.exists()){
                            setCalendar(snapshot.val())
    
                        } else {
                            newCalendar = initializeCalendar()
                            firebase.database().ref(`users/${user.uid}/calendar`).set(newCalendar).then(() => {
                            })
                        }
                    }
                    if (history.location.pathname === '/') {
                        history.push('/dashboard')
                    }
                }
            })

        }
    })

    return (
    <Route {...rest} component={(props) => (
        uid ? (
            <Redirect to="/dashboard" />
        ) : (
            <Component {...props} />

        )
    )}/>



    // <Route {...rest} component={(props) => (
    //         <Component {...props} />
    // )}/>
)}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)