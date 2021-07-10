import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { login, logout } from './actions/auth'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'
import DateContextProvider from './contexts/date-context'
import UserContextProvider from './contexts/user-context'

const store = configureStore()

const generateJSX = (uid) => (
    
    <Provider store={store}>
        <UserContextProvider uid={uid}>
            <DateContextProvider>
                <AppRouter />
            </DateContextProvider>
        </UserContextProvider>
    </Provider>
)
let jsx
let hasRendered = false;
const renderApp = (uid) => {
    if (!hasRendered) {
        jsx = generateJSX(uid)
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render(<LoadingPage /> , document.getElementById('app'))


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let uid = user.uid
        renderApp(uid)
        if (history.location.pathname === '/') {
            history.push('/dashboard')
        }

    } else {
        renderApp()
        history.push('/')
    }
})


