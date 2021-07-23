import React, { useContext } from 'react'
import { connect } from 'react-redux'
import AppRouter, { history } from '../routers/AppRouter'
import { UserContext } from '../contexts/user-context'
import { DateContext } from '../contexts/date-context'
import { firebase, googleAuthProvider } from '../firebase/firebase'
// import user context for uid to pass into startlogin


export const LoginPage = () => {
    const [ state, login, logout ] = useContext(UserContext)
    let { uid } = state


    let { dateState, setCalendar } = useContext(DateContext)
    let { calendar } = dateState
    let newCalendar
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user){
            uid = user.uid
            login(uid)
            firebase.database().ref(`users/${uid}/calendar`).once('value', (snapshot) => {
                if (snapshot.exists()){
                    setCalendar(snapshot.val())
                    console.log('set calendar to ')
                    console.log(snapshot.val())
                    // console.log('from the snapshot val')
                    // console.log(snapshot.val())
                } else {
                    newCalendar = initializeCalendar()
                    firebase.database().ref(`users/${uid}/calendar`).set(newCalendar).then(() => {
                    })
                }
                if (history.location.pathname === '/') {
                    history.push('/dashboard')
                }
            })

        }
    })
    return (
        <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">React Tarot</h1>
                <p>fortunes and journal</p>
                <button className="button" onClick={() => firebase.auth().signInWithPopup(googleAuthProvider)}>Login with google</button>

            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)