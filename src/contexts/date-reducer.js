import { firebase, googleAuthProvider } from '../firebase/firebase'
import { getMonthAndNumDays } from '../actions/calendarUpdatingFuncs'

const DateReducer = (state, action) => {
    let newMonth, newYear
    switch (action.type){
        case "MONTH_INC":
            [newMonth, newYear] = action.payload.newMonthAndYear
            return {
                ...state,
                calendarMonth: newMonth,
                calendarYear: newYear
            }
        case "MONTH_DEC":
            [newMonth, newYear] = action.payload.newMonthAndYear
            return {
                ...state,
                calendarMonth: newMonth,
                calendarYear: newYear
            }
        case "YEAR_INC":
            return {
                ...state,
                calendarYear: action.payload.newYear
            }
        case "YEAR_DEC":
            return {
                ...state,
                calendarYear: action.payload.newYear
            }
        case "UPDATE_CALENDAR":
            return {
                ...state,
                calendar: action.payload.calendar
            }
    }
}

export default DateReducer