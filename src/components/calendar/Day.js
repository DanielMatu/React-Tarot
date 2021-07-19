import React, { useContext } from 'react';
import { DateContext } from '../../contexts/date-context';
import { UserContext } from '../../contexts/user-context'
import { EntryContext } from '../../contexts/entry-context'
import { history } from '../../routers/AppRouter'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'



const Day = ( props ) => {
    const { dayNumber } = props

    const [ entryState, setTitle, setDate, setBody, setEntryIndex, setFortune, setIsEditing ] = useContext(EntryContext)
    const [ title, entryDate, body, fortune, isEditing ] = entryState

    const [state, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry, editGivenEntry] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state
    let [ month, numDays ] = getMonthAndNumDays(numericalMonth)

    let entries = calendar[year][month][dayNumber - 1]['entries']

    const navigateToEditEntry = (id, entry) => {
        setTitle(entry.preview)
        setDate(entry.date)
        setBody(entry.body)
        setFortune(entry.fortune)
        console.log('heres fortssune')
        console.log(entry.fortune)
        setEntryIndex(id)
        setIsEditing(true)
        history.push('/create')


    }

    return (
        <div className='day-container'>
            <div className='day-number'>{ dayNumber }</div>
            {
                entries
                &&
                entries.map((entry, id) => (
                    <div key={id} className='entry-preview'  onClick={() => navigateToEditEntry(id, entry)}>
                        <div className='entry-title'>{entry.preview}</div>
                        <button className='remove-entry-button' onClick={(e) => { removeEntry(dayNumber, id); e.stopPropagation()}}>&#8722;</button>
                    </div>
                ))
            }
        </div>
    )


}

export default Day;