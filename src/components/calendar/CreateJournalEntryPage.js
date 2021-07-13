import React, { useState, useContext } from 'react'
import { DateContext } from '../../contexts/date-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'
import moment from 'moment'
import { firebase } from '../../firebase/firebase'
import { history } from '../../routers/AppRouter'
import { Prompt } from 'react-router'
import TarotAlert from '../TarotAlert'


const CreateJournalEntryPage = () => {
    const [state, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state
    
    const date = new Date()
    let [ stringMonth, numDays ] = getMonthAndNumDays(date.getMonth() + 1) 

    // const entryDate = stringMonth + ' ' + date.getDate().toString() +  ' ' + date.getFullYear()

    const [title, setTitle] = useState('');
    const updateTitle = (e) => {
        return setTitle(e.target.value);
    }

    const [entryDate, setDate] = useState(stringMonth + ' ' + date.getDate().toString() +  ' ' + date.getFullYear());

    const [body, setBody] = useState('')
    const updateBody = (e) => setBody(e.target.value);

    const [alertActive, setAlertActive] = useState(false) 
    const [reqErrActive, setReqErrActive] = useState(false)

    const submitTodaysEntry = (title, entryDate, body, calendar) => {
        if (!title) {
            setReqErrActive(true)
        } else {
            saveTodaysEntry(title, entryDate, body, calendar)
            setTitle("")
            setDate("")
            setBody("")
            setAlertActive(true)
        }

        // history.push('/dashboard')
    }
    return (
        <div className = 'create-entry-wrapper'>
            {
                alertActive && 
                <TarotAlert alertText={"Journal entry saved successfully!"} goBackHandler={() => history.push('/dashboard')}/>

            }
          <Prompt
            when={true}
            message={
                location => `Your changes haven't been saved, are you sure you want to leave this page?`
             }
          />
            <div className='create-entry-container'>
                <div className='half-entry text-entry'>
                    <textarea className='entry-text-area entry-title' placeholder="Enter a title:" value={title} onChange={updateTitle} required></textarea>
                    {
                        reqErrActive &&
                        <div className='error-message'>Please enter a title</div>
                    }
                    <textarea className='entry-text-area entry-date' value={entryDate} readOnly></textarea>

                    <textarea className='entry-text-area text-area-body' value={body} onChange={updateBody} >

                    </textarea>
                </div>
                <div className='book-spine'></div>
                <div className='half-entry bottom-entry'>
                    <div className='entry-button view-fortune-button'>
                        VIEW FORTUNE
                    </div>
                    <div className='entry-button save-button' onClick={() => submitTodaysEntry(title, entryDate, body, calendar)}>
                        SAVE
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateJournalEntryPage