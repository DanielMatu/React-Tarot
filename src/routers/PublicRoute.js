import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../contexts/user-context'


export const PublicRoute = ({ 
    component: Component,
    ...rest
}) => {
    const [ state, login, logout ] = useContext(UserContext)
    const { uid } = state 
    return (
    <Route {...rest} component={(props) => (
        uid ? (
            <Redirect to="/dashboard" />
        ) : (
            <Component {...props} />
        )
    )}/>
)}

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)