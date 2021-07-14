import React, { useEffect, useReducer, useContext, createContext } from 'react'
import DateReducer from './date-reducer'
import { 
    getIncrementedMonthAndYear, 
    getDecrementedMonthAndYear,
    getIncrementedYear,
    getDecrementedYear,
    initializeCalendar,
    getMonthAndNumDays,
} from '../actions/calendarUpdatingFuncs'
import { firebase } from '../firebase/firebase'
import { UserContext } from './user-context'
import { EntryContext } from './entry-context'
import { history } from '../routers/AppRouter'
const db = firebase.database()
const DateContext = createContext()
export { DateContext }




const DateContextProvider = (props) => {

    let { calendar, children } = props
    const [ userState, login, logout ] = useContext(UserContext)

    const [ entryState, setTitle, setDate, setBody, setFortuneExists, setIsEditing ] = useContext(EntryContext)
    const [ title, entryDate, body, fortuneExists, isEditing, entry ] = entryState

    console.log('is this a good ref?')
    console.log(entry)

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

    const removeEntry = (dayNumber, index) => {
        const [stringMonth, numDays] = getMonthAndNumDays(month)
        const entries = calendar[year][stringMonth][dayNumber - 1]['entries']
        let newEntries = [...entries]
        newEntries.splice(index, 1)
        console.log('heres newEntries')
        console.log(newEntries)

        const confirmed = confirm("Are you sure you want to delete this journal entry?");
        if (confirmed){
            calendar[year][stringMonth][dayNumber - 1]['entries'] = newEntries
            db.ref(`users/${uid}/calendar/${year}/${stringMonth}/${dayNumber - 1}/entries`).set(newEntries).then(() => {
                dispatch({ type: 'UPDATE_CALENDAR', payload: { calendar }})
            })
        }
    }

    const saveTodaysEntry = (title, entryDate, body, calendar) => {
        let date = new Date() 
        let currDayNumber = date.getDate()
        let currMonth = date.getMonth() + 1
        let currYear = date.getFullYear()
        let [ stringCurrMonth, numDays ] = getMonthAndNumDays(currMonth)
        let todaysEntries = calendar[currYear][stringCurrMonth][currDayNumber - 1]['entries']
        // firebase gets rid of the field entirely if theres nothing in it, so entries can sometimes be null
        if (!todaysEntries){
            todaysEntries = []
        }

        todaysEntries.push({'preview': title, 'date': entryDate, 'body': body})
        calendar[currYear][stringCurrMonth][currDayNumber - 1]['entries'] = todaysEntries
        return firebase.database().ref(`users/${uid}/calendar/${currYear}/${stringCurrMonth}/${currDayNumber - 1}/entries`)
                                  .set(todaysEntries)
                                  .then(() => {
                                        dispatch({ type: 'UPDATE_CALENDAR', payload: {calendar}})
                                    })
    }

    const dateToMDY = (givenDate) => {
        let splitDates = entryDate.split(' ')
        splitDates[1] = parseInt(splitDates[1])
        console.log('heres splitdates')
        console.log(splitDates)
        let [ entryMonth, entryDay, entryYear ] = splitDates
        return [ entryMonth, entryDay, entryYear ]
    }

    const saveGivenDatesEntry = (title, entryDate, body, calendar) => {

        let [ entryMonth, entryDay, entryYear ] = dateToMDY(entryDate)
        console.log(calendar[entryYear][entryMonth])
    }

    const editEntry = (entry) => {
        setTitle(entry.preview)
        setDate(entry.date)
        setBody(entry.body)
        setIsEditing(true)
        history.push('/create')
    }



    return (
        <DateContext.Provider value={ [state, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry, saveGivenDatesEntry, editEntry] }>
            {
                children
            }
        </DateContext.Provider>
    )
}

export default DateContextProvider