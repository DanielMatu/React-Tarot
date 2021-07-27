import React, { useContext } from 'react'
import { connect } from 'react-redux'
import AppRouter, { history } from '../routers/AppRouter'
import { UserContext } from '../contexts/user-context'
import { DateContext } from '../contexts/date-context'
import { initializeCalendar } from '../actions/calendarUpdatingFuncs'
import { firebase, googleAuthProvider } from '../firebase/firebase'
// import user context for uid to pass into startlogin


export const LoginPage = () => {
    const [ state, login, logout ] = useContext(UserContext)
    const { uid } = state


    let { dateState, setCalendar } = useContext(DateContext)
    let { calendar } = dateState
    let newCalendar
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            login(user.uid)
        }
    })

    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user){
    //         // update the state to know what the uid is
    //         login(user.uid)

    //         // set the user in the database if there isnt one
    //         firebase.database().ref(`users/${user.uid}`).once('value', (snapshot) => {
    //             if (snapshot.exists()){
    //             } else {
    //                 firebase.database().ref(`users/${user.uid}`).set({})
    //             }
    //         })


    //         // read calendar from database and set calendar in state
    //         firebase.database().ref(`users/${user.uid}/calendar`).once('value', (snapshot) => {
    //             console.log('after firebase read calendar its calendar in state is ')
    //             console.log(calendar)
    //             if (Object.keys(calendar).length === 0){
    //                 if (snapshot.exists()){
    //                     setCalendar(snapshot.val())
    //                     console.log('loginpage set calendar to ')
    //                     console.log(snapshot.val())

    //                 } else {
    //                     newCalendar = initializeCalendar()
    //                     firebase.database().ref(`users/${user.uid}/calendar`).set(newCalendar).then(() => {
    //                     })
    //                 }
    //             }
    //             if (history.location.pathname === '/') {
    //                 history.push('/dashboard')
    //             }
    //         })

    //     }
    // })
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