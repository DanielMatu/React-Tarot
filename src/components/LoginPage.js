import React, { useContext } from 'react'
import { connect } from 'react-redux'
import AppRouter, { history } from '../routers/AppRouter'
import { UserContext } from '../contexts/user-context'
import { DateContext } from '../contexts/date-context'
import { initializeCalendar } from '../actions/calendarUpdatingFuncs'
import { firebase, googleAuthProvider } from '../firebase/firebase'
// import user context for uid to pass into startlogin



export const LoginPage = () => {

    const [ state, login, setPlay ] = useContext(UserContext)
    const { uid, play } = state

    let { dateState, setCalendar } = useContext(DateContext)
    let { calendar } = dateState

    // React.useEffect(() => {
    //     const serializedCalendar = JSON.stringify(calendar);
    //     console.log('serialized calendar')
    //     console.log(serializedCalendar)
    //     console.log('nonserialized calendar')
    //     console.log(calendar)
    //     localStorage.setItem('serializedCalendar', serializedCalendar);
    //     console.log('heres the calendar i just stored')
    //     console.log(localStorage.getItem('serializedCalendar'))

    // }, [calendar])

    const loadAccDetails = (loginRes) => {
        let uid = loginRes.user.uid
        console.log('the uid is ')
        console.log(uid)
        login(uid)

        firebase.database().ref(`users/${uid}`).once('value', (snapshot) => {
            if (snapshot.exists()){
            } else {
                firebase.database().ref(`users/${uid}`).set({})
            }
        })


        // read calendar from database and set calendar in state
        firebase.database().ref(`users/${uid}/calendar`).once('value', (snapshot) => {
            if (calendar){
                if (Object.keys(calendar).length === 0){
                    if (snapshot.exists()){
                        setCalendar(snapshot.val())
                        localStorage.setItem('serializedCalendar', JSON.stringify(snapshot.val()))

                    } else {
                        let newCalendar = initializeCalendar
                        setCalendar(newCalendar)
                        firebase.database().ref(`users/${uid}/calendar`).set(calendar).then(() => {
                            localStorage.setItem('serializedCalendar', JSON.stringify(newCalendar))
                        })
                    }
                }

            }
        })
        
        localStorage.setItem('uid', uid)
    
    }

    return (
        <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">React Tarot</h1>
                <p>fortunes and journal</p>
                <button className="button" onClick={() => firebase.auth().signInWithPopup(googleAuthProvider).then((loginRes) => loadAccDetails(loginRes))}>Login with google</button>

            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)