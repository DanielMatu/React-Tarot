import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header';
import { UserContext } from '../contexts/user-context'


export const PrivateRoute = ({  
                                component: Component,
                                ...rest
                            }) => 
    {
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