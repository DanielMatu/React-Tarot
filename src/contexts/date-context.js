import React, { useReducer, useEffect, useContext, createContext } from 'react'
import DateReducer from './date-reducer'
import { 
    getIncrementedMonthAndYear, 
    getDecrementedMonthAndYear,
    getIncrementedYear,
    getDecrementedYear,
    getMonthAndNumDays,
} from '../actions/calendarUpdatingFuncs'
import { firebase } from '../firebase/firebase'
import { UserContext } from './user-context'
const db = firebase.database()
const DateContext = createContext()
export { DateContext }




const DateContextProvider = (props) => {

    let { children } = props
    const [ userState, login, logout ] = useContext(UserContext)

    let { uid } = userState

    const date = new Date()

    let initialCalendar = {}
    let initialCalendarMonth = date.getMonth() + 1
    let initialCalendarYear = date.getFullYear()

    const initialState = {calendarMonth: initialCalendarMonth, calendarYear: initialCalendarYear, calendar: initialCalendar}
    const [ dateState, dispatch ] = useReducer(DateReducer, initialState)

    const monthInc = (currMonth, currYear) => { dispatch({ type: 'MONTH_INC', payload: {newMonthAndYear: getIncrementedMonthAndYear(currMonth, currYear)} })}
    const monthDec = (currMonth, currYear) => dispatch({ type: 'MONTH_DEC',  payload: {newMonthAndYear: getDecrementedMonthAndYear(currMonth, currYear)}})
    const yearInc = (currYear) => dispatch({ type: 'YEAR_INC', payload: {newYear: getIncrementedYear(currYear)}})
    const yearDec = (currYear) => dispatch({  type: 'YEAR_DEC',payload: { newYear: getDecrementedYear(currYear)}})

    const setCalendar = (newCalendar) => dispatch({ type: 'UPDATE_CALENDAR', payload: {newCalendar}})


    const removeEntry = (dayNumber, index) => {
        const [stringMonth, numDays] = getMonthAndNumDays(dateState.calendarMonth)
        const entries = dateState.calendar[dateState.calendarYear][stringMonth][dayNumber - 1]['entries']
        let newEntries = [...entries]
        newEntries.splice(index, 1)

        const confirmed = confirm("Are you sure you want to delete this journal entry?");
        if (confirmed){
            dateState.calendar[dateState.calendarYear][stringMonth][dayNumber - 1]['entries'] = newEntries
            db.ref(`users/${uid}/calendar/${dateState.calendarYear}/${stringMonth}/${dayNumber - 1}/entries`).set(newEntries).then(() => {
                dispatch({ type: 'UPDATE_CALENDAR', payload: { newCalendar: dateState.calendar }})
                localStorage.setItem('serializedCalendar', JSON.stringify(dateState.calendar))
            })
        }
    }

    const saveTodaysEntry = async (title, entryDate, body, id, fortune={}, deck, unmodifiedFortune, unmodifiedDeck) => {
        console.log('gonna save with this unmodified deck')
        console.log(unmodifiedDeck)
        let date = new Date() 
        let currDayNumber = date.getDate()
        let currMonth = date.getMonth() + 1
        let currYear = date.getFullYear()
        let [ stringCurrMonth, numDays ] = getMonthAndNumDays(currMonth)
        let todaysEntries = dateState.calendar[currYear][stringCurrMonth][currDayNumber - 1]['entries']
        // firebase gets rid of the field entirely if theres nothing in it, so entries can sometimes be null
        if (!todaysEntries){
            todaysEntries = []
        }
        todaysEntries.push({'preview': title, 'date': entryDate, 'body': body, 'fortune':fortune, 'deck':deck, 'unmodifiedFortune':unmodifiedFortune, 'unmodifiedDeck': unmodifiedDeck})
        dateState.calendar[currYear][stringCurrMonth][currDayNumber - 1]['entries'] = todaysEntries
        return firebase.database().ref(`users/${uid}/calendar/${currYear}/${stringCurrMonth}/${currDayNumber - 1}/entries`)
                                  .set(todaysEntries)
                                  .then(() => {
                                        dispatch({ type: 'UPDATE_CALENDAR', payload: {newCalendar: dateState.calendar }})
                                        localStorage.setItem('serializedCalendar', JSON.stringify(dateState.calendar))
                                    })
    }

    const editGivenEntry = (title, entryDate, body, id, fortune={}, deck, unmodifiedFortune, unmodifiedDeck) => {
        let splitDates = entryDate.split(' ')
        splitDates[1] = parseInt(splitDates[1] - 1)
        let [ entryMonth, entryDay, entryYear ] = splitDates
        let todaysEntries = dateState.calendar[entryYear][entryMonth][entryDay]['entries']
        todaysEntries[id] =  {'preview': title, 'date': entryDate, 'body': body, 'fortune':fortune, 'deck': deck, 'unmodifiedFortune':unmodifiedFortune, 'unmodifiedDeck': unmodifiedDeck}
        dateState.calendar[entryYear][entryMonth][entryDay]['entries'] = todaysEntries
        return firebase.database().ref(`users/${uid}/calendar/${entryYear}/${entryMonth}/${entryDay}/entries`)
                                  .set(todaysEntries)
                                  .then(() => {
                                        dispatch({ type: 'UPDATE_CALENDAR', payload: {newCalendar: dateState.calendar }})
                                        localStorage.setItem('serializedCalendar', JSON.stringify(dateState.calendar))
                                    })
    }





    return (
        <DateContext.Provider value={ {dateState, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry, editGivenEntry, setCalendar} }>
            {
                children
            }
        </DateContext.Provider>
    )
}

export default DateContextProvider