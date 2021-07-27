import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'
import DateContextProvider from './contexts/date-context'
import UserContextProvider from './contexts/user-context'
import EntryContextProvider from './contexts/entry-context'
import FortuneContextProvider from './contexts/fortune-context'
import { initializeCalendar } from './actions/calendarUpdatingFuncs'

// window.onload = function () {
//     history.push('/dashboard')
// }

const store = configureStore()

const generateJSX = (uid, initialCalendar) => (
    <Provider store={store}>
        <UserContextProvider uid={uid}>
            <EntryContextProvider >
                <DateContextProvider initialCalendar={initialCalendar}>
                    <FortuneContextProvider>
                        <AppRouter />
                    </FortuneContextProvider>
                </DateContextProvider>
            </EntryContextProvider>
        </UserContextProvider>
    </Provider>
)
let jsx
let hasRendered = false;
const renderApp = (uid, initialCalendar) => {
    if (!hasRendered) {
        console.log('rerendering')
        jsx = generateJSX(uid, initialCalendar)
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render(<LoadingPage /> , document.getElementById('app'))


// this makes it so if someone refreshes while logged in, the uid is set again so it wont be lost
// or it logs out if the uid timed out

firebase.auth().onAuthStateChanged((user) => {
    if (user){
        let uid = user.uid
        let initialCalendar 
        firebase.database().ref(`users/${uid}/calendar`).once('value', (snapshot) => {
            if (snapshot.exists()){
                initialCalendar = snapshot.val()
            }
            else {
                initialCalendar = initializeCalendar()
            }
        }).then(() => {
            console.log('onauth triggered with the uid ')
            console.log(uid)
            console.log('onauth triggered with the calendar ')
            console.log(initialCalendar)
            hasRendered = false
            renderApp(uid, initialCalendar)
        })
    } else {
        renderApp()
    }


})

