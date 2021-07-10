import React, { useContext, createContext } from 'react'
import Journal from './Journal'
import { DateContext } from '../../contexts/date-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'


const JournalPage = () => {
    // console.log(useContext(DateContext))
    let [state, monthInc, monthDec, yearInc, yearDec] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state
    let [ month, numDays ] = getMonthAndNumDays(numericalMonth) 


    const journalArgs = {"monthName": month, "numDays": numDays}
    return (
        <div>


                <Journal {...journalArgs} />


        </div>
    )

}

export default JournalPage