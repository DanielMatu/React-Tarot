import React, { useContext, createContext } from 'react'
import Journal from './Journal'
import { DateContext } from '../../contexts/date-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'


const JournalPage = () => {
    // console.log(useContext(DateContext))
    let {dateState, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry, editGivenEntry} = useContext(DateContext)
    let { calendarMonth, calendarYear, calendar } = dateState
    let [ month, numDays ] = getMonthAndNumDays(calendarMonth) 


    const journalArgs = {"monthName": month, "numDays": numDays}
    return (
        <div>


                <Journal {...journalArgs} />


        </div>
    )

}

export default JournalPage