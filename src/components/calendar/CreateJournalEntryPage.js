import React, { useState, useContext } from 'react'
import { DateContext } from '../../contexts/date-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'
import moment from 'moment'
import { firebase } from '../../firebase/firebase'



const CreateJournalEntryPage = () => {
    const [state, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state
    
    const date = new Date()
    let [ stringMonth, numDays ] = getMonthAndNumDays(date.getMonth() + 1) 

    const entryDate = stringMonth + ' ' + date.getDate().toString() +  ' ' + date.getFullYear()

    const [title, setTitle] = useState('');
    const updateTitle = (e) => setTitle(e.target.value);

    const [body, setBody] = useState('')
    const updateBody = (e) => setBody(e.target.value);

    const submitEntry = (title, entryDate, body, calendar) => {
        saveTodaysEntry(title, entryDate, body, calendar)
    }
    return (
        <div className = 'create-entry-wrapper'>
            <div className='create-entry-container'>
                <div className='half-entry text-entry'>
                    <textarea className='entry-text-area entry-title' placeholder="Enter a title:" value={title} onChange={updateTitle}></textarea>
                    <textarea className='entry-text-area entry-date' value={entryDate} readOnly></textarea>

                    <textarea className='entry-text-area text-area-body' value={body} onChange={updateBody} >

                    </textarea>
                </div>
                <div className='book-spine'></div>
                <div className='half-entry bottom-entry'>
                    <div className='entry-button view-fortune-button'>
                        VIEW FORTUNE
                    </div>
                    <div className='entry-button save-button' onClick={() => saveTodaysEntry(title, entryDate, body, calendar)}>
                        SAVE
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateJournalEntryPage