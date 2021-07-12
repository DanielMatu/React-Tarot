import React, { useContext } from 'react'
import { DateContext } from '../../contexts/date-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'


const CreateJournalEntryPage = () => {
    let [state, monthInc, monthDec, yearInc, yearDec] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state
    let [ month, numDays ] = getMonthAndNumDays(numericalMonth) 


    return (
        <div>


                cjep


        </div>
    )

}

export default CreateJournalEntryPage