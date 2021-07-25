import React, { useContext } from 'react';
import { DateContext } from '../../contexts/date-context';
import { UserContext } from '../../contexts/user-context'
import { EntryContext } from '../../contexts/entry-context'
import { history } from '../../routers/AppRouter'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'



const Day = ( props ) => {
    const { dayNumber } = props

    const { setTitle, setDate, setBody, setEntryIndex, setFortune, setIsEditing, setDeck, setUnmodifiedDeck, setUnmodifiedFortune } = useContext(EntryContext)

    const {dateState, removeEntry} = useContext(DateContext)
    let { calendarMonth, calendarYear, calendar } = dateState
    let [ month, numDays ] = getMonthAndNumDays(calendarMonth)



    let entries = calendar[calendarYear][month][dayNumber - 1]['entries']

    const navigateToEditEntry = (id, entry) => {
        setTitle(entry.preview)
        setDate(entry.date)
        setBody(entry.body)
        if (entry.fortune){
            setFortune(entry.fortune)
        } else {
            setFortune({})
        }
        setDeck(entry.deck)
        setUnmodifiedFortune(entry.unmodifiedFortune)
        setUnmodifiedDeck(entry.unmodifiedDeck)
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
                    <div className='entry-preview-container'>
                        <div key={id} className='entry-preview'  onClick={() => navigateToEditEntry(id, entry)}>
                            <div className='entry-title'>{entry.preview}</div>
                        </div>
                        <button className='remove-entry-button' onClick={(e) => { removeEntry(dayNumber, id); e.stopPropagation()}}>&#8722;</button>
                    </div>

                ))
            }
        </div>
    )


}

export default Day;