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

window.onload = function () {
    history.push('/dashboard')
}

const store = configureStore()

const generateJSX = () => (
    <Provider store={store}>
        <UserContextProvider>
            <EntryContextProvider>
                <DateContextProvider>
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
const renderApp = (uid, calendar) => {
    if (!hasRendered) {
        jsx = generateJSX(uid, calendar)
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render(<LoadingPage /> , document.getElementById('app'))



renderApp()


