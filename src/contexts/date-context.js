import React, { useEffect, useReducer, useContext, createContext } from 'react'
import DateReducer from './date-reducer'
import { 
    getIncrementedMonthAndYear, 
    getDecrementedMonthAndYear,
    getIncrementedYear,
    getDecrementedYear,
    initializeCalendar,
    getMonthAndNumDays
} from '../actions/calendarUpdatingFuncs'
import { firebase } from '../firebase/firebase'
import { UserContext } from './user-context'
const db = firebase.database()
const DateContext = createContext()
export { DateContext }




const DateContextProvider = (props) => {

    let { calendar, children } = props
    const [ userState, login, logout ] = useContext(UserContext)

    let { uid } = userState
    console.log('uid from date-context')
    console.log(uid)

    const date = new Date()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const initialState = [month, year, calendar]
    const [ state, dispatch ] = useReducer(DateReducer, initialState)


    useEffect(() => {
        month = state[0]
        year = state[1]
        calendar = state[2]
    }, [state]);

    useEffect(() => {
        console.log('year changed22')
    }, [state[0]]);

    useEffect(() => {
        console.log('month changed22')
    }, [state[1]]);

    const monthInc = () => {
                            dispatch(
                            { 
                                type: 'MONTH_INC', 
                                payload: {
                                    newMonthAndYear: getIncrementedMonthAndYear(month, year)
                                }
                            })
    }
    const monthDec = () => dispatch(
                            { 
                                type: 'MONTH_DEC', 
                                payload: {
                                    newMonthAndYear: getDecrementedMonthAndYear(month, year)
                                }
                            })
    const yearInc = () => dispatch(
                            { 
                                type: 'YEAR_INC', 
                                payload: {
                                    newYear: getIncrementedYear(year)
                                }
                            })

    const yearDec = () => dispatch(
                            { 
                                 type: 'YEAR_DEC',
                                 payload: {
                                     newYear: getDecrementedYear(year)
                                 }
                            })
    const removeEntry = (dayNumber, entry) => {

        const [stringMonth, numDays] = getMonthAndNumDays(month) 
        const entryPreviews = calendar[year][stringMonth][dayNumber - 1]['entryPreviews']
        const newEntryPreviews = entryPreviews.filter((ele) => ele !== entry )
        calendar[year][stringMonth][dayNumber - 1]['entryPreviews'] = newEntryPreviews

        const confirmed = confirm("Are you sure you want to delete this journal entry?");
        if (confirmed){
            db.ref(`users/${uid}/calendar/${year}/${stringMonth}/${dayNumber - 1}/entryPreviews`).set(newEntryPreviews).then(() => {
                dispatch({ type: 'UPDATE_DAY', payload: { calendar }})
            })
        }


    }


    return (
        <DateContext.Provider value={ [state, monthInc, monthDec, yearInc, yearDec, removeEntry] }>
            {
                children
            }
        </DateContext.Provider>
    )
}

export default DateContextProvider