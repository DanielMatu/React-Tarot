import { firebase, googleAuthProvider } from '../firebase/firebase'
import { getMonthAndNumDays } from '../actions/calendarUpdatingFuncs'

const DateReducer = (state, action) => {
    let newMonth, newYear
    switch (action.type){
        case "MONTH_INC":
            [newMonth, newYear] = action.payload.newMonthAndYear
            state[0] = newMonth
            state[1] = newYear
            return [
                ...state,
            ]
        case "MONTH_DEC":
            [newMonth, newYear] = action.payload.newMonthAndYear
            state[0] = newMonth
            state[1] = newYear
            return [
                ...state,
            ]
        case "YEAR_INC":
            state[1] = action.payload.newYear
            return [
                ...state
            ]
        case "YEAR_DEC":
            state[1] = action.payload.newYear
            return [
                ...state
            ]
        case "UPDATE_DAY":
            state[2] = action.payload.calendar
            return [
                ...state
            ]
    }
}

export default DateReducer