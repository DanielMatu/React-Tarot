import React, { useContext } from 'react';
import { DateContext } from '../../contexts/date-context';
import { UserContext } from '../../contexts/user-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'



const Day = ( props ) => {
    const { dayNumber } = props
    const [state, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry, navigateToEditEntry, editGivenEntry] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state
    let [ month, numDays ] = getMonthAndNumDays(numericalMonth)

    let entries = calendar[year][month][dayNumber - 1]['entries']



    return (
        <div className='day-container'>
            <div className='day-number'>{ dayNumber }</div>
            {
                entries
                &&
                entries.map((entry, id) => (
                    <div key={id} className='entry-preview'>
                        <div className='entry-title' onClick={() => navigateToEditEntry(id, entry)}>{entry.preview}</div>
                        <button className='remove-entry-button' onClick={() => removeEntry(dayNumber, id)}>&#8722;</button>
                    </div>
                ))
            }
        </div>
    )


}

export default Day;