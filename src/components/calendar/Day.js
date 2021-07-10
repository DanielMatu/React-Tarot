import React, { useContext } from 'react';
import { DateContext } from '../../contexts/date-context';
import { UserContext } from '../../contexts/user-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'


// day : { journalEntryPreviews [...] }
// journalEntryPreviews = {name : 'journal1'}
const Day = ( props ) => {
    const { dayNumber } = props
    const [state, monthInc, monthDec, yearInc, yearDec] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state
    let [ month, numDays ] = getMonthAndNumDays(numericalMonth)

    let entryPreviews = calendar[year][month][dayNumber - 1]['entryPreviews']



    return (
        <div className='day-container'>
            <div className='day-number'>{ dayNumber }</div>
            {
                entryPreviews.map((entry) => (
                    <div className='entry-preview'>
                        <div className='entry-title'>{entry}</div>
                        <button className='remove-entry-button'>&#8722;</button>
                    </div>
                ))
                // console.log(entryPreviews)
            }
        </div>
    )


}

export default Day;