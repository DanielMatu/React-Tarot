import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'
import AppRouter, { history } from '../routers/AppRouter'
import { UserContext } from '../contexts/user-context'
import { firebase, googleAuthProvider } from '../firebase/firebase'
// import user context for uid to pass into startlogin


export const LoginPage = () => {
    const [ state, login, logout ] = useContext(UserContext)
    let { uid } = state
    firebase.auth().onAuthStateChanged((user) => {
        if (user){
            uid = user.uid
            login(uid)
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
        }
    })
    return (
        <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">Boilerplate</h1>
                <p>Tag line for app</p>
                <button className="button" onClick={() => firebase.auth().signInWithPopup(googleAuthProvider)}>Login with google</button>

            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)