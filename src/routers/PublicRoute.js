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

    const { setCalendar } = useContext(DateContext)

    if (!uid){
        let persistedUid = localStorage.getItem('uid')
        let persistedSerializedCalendar = localStorage.getItem('serializedCalendar')
        try {
            let persistedCalendar = JSON.parse(persistedSerializedCalendar)
            if (persistedCalendar){
                setCalendar(persistedCalendar)
            }
            if (persistedUid){
                login(persistedUid)
            }

        } catch (e) {
            console.log('error')
            console.log(e)
        }
    }

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