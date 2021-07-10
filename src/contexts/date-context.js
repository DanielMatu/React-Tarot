import React, { useReducer, useContext, createContext } from 'react'
import DateReducer from './date-reducer'
import { 
    getIncrementedMonthAndYear, 
    getDecrementedMonthAndYear,
    getIncrementedYear,
    getDecrementedYear,
    initializeCalendar
} from '../actions/calendarUpdatingFuncs'
import { firebase } from '../firebase/firebase'
import { UserContext } from './user-context'
const db = firebase.database()
const DateContext = createContext()
export { DateContext }

// shouldnt be here
const calendar = initializeCalendar()

// causing error
const randomFunc = async () => {

}

const DateContextProvider = ({ children }) => {

    
    const [ userState, login, logout ] = useContext(UserContext)

    let { uid } = userState
    console.log('uid from date-context')
    console.log(uid)
    let testVar
    const date = new Date()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const uidStringFromFirebase = firebase.database().ref().once('value').then(function(dataSnapshot) {
         console.log('datasnapshot')
         console.log(dataSnapshot)
         testVar = dataSnapshot
      });
      console.log('heres testvar')
      console.log(testVar)

    const initialState = [month, year, calendar]
    const [ state, dispatch ] = useReducer(DateReducer, initialState)
    const monthInc = () => {
                            dispatch(
                            { 
                                type: 'MONTH_INC', 
                                payload: {
                                    newMonthAndYear: getIncrementedMonthAndYear(state[0], state[1])
                                }
                            })
                            db.ref('users/calendar')
    }
    const monthDec = () => dispatch(
                            { 
                                type: 'MONTH_DEC', 
                                payload: {
                                    newMonthAndYear: getDecrementedMonthAndYear(state[0], state[1])
                                }
                            })
    const yearInc = () => dispatch(
                            { 
                                type: 'YEAR_INC', 
                                payload: {
                                    newYear: getIncrementedYear(state[1])
                                }
                            })

    const yearDec = () => dispatch(
                            { 
                                 type: 'YEAR_DEC',
                                 payload: {
                                     newYear: getDecrementedYear(state[1])
                                 }
                            })
    // const yearDec = () => console.log('year is decremented')


    return (
        <DateContext.Provider value={ [state, monthInc, monthDec, yearInc, yearDec] }>
            {
                children
            }
        </DateContext.Provider>
    )
}

export default DateContextProvider