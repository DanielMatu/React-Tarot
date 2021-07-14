import React, { useState, useContext } from 'react'
import { DateContext } from '../../contexts/date-context'
import { EntryContext } from '../../contexts/entry-context'

import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'
import { firebase } from '../../firebase/firebase'
import { history } from '../../routers/AppRouter'
import { Prompt } from 'react-router'
import TarotAlert from '../TarotAlert'


const JournalEntryPage = () => {

    // needs component to accept props
    // let {passedTitle, passedDate, passedBody, passedFortuneExists} = props 

    
    const [ entryState, setTitle, setDate, setBody, setFortuneExists ] = useContext(EntryContext)
    const [ title, date, body, fortuneExists ] = entryState
    console.log('entrystate')
    console.log(entryState)

    const [state, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state

    const updateTitle = (e) => setTitle(e.target.value);
    const updateBody = (e) => setBody(e.target.value);

    const [alertActive, setAlertActive] = useState(false) 
    const [reqErrActive, setReqErrActive] = useState(false)

    const submitTodaysEntry = (title, date, body, calendar) => {
        if (!title) {
            setReqErrActive(true)
        } else {
            saveTodaysEntry(title, date, body, calendar)
            setTitle("")
            setDate("")
            setBody("")
            setAlertActive(true)
        }

    }
    return (
        <div className = 'create-entry-wrapper'>
            {
                alertActive && 
                <TarotAlert alertText={"Journal entry saved successfully!"} goBackHandler={() => history.push('/dashboard')}/>

            }
          <Prompt
            when={!alertActive}
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
                    <textarea className='entry-text-area entry-date' value={date} readOnly></textarea>


                    <textarea className='entry-text-area text-area-body' value={body} onChange={updateBody} >

                    </textarea>
                </div>
                <div className='book-spine'></div>
                <div className='half-entry bottom-entry'>
                    {
                        fortuneExists && 
                        <div className='entry-button view-fortune-button'>
                            VIEW FORTUNE
                        </div>
                    }
                    {
                        !fortuneExists && 
                        <div className='entry-button view-fortune-button'>
                            ATTACH NEW FORTUNE
                        </div>
                    }
                    {/* {submitTodaysEntry(title, date, body, calendar)} */}
                    <div className='entry-button save-button' onClick={() => submitTodaysEntry(title, date, body, calendar)}>
                        SAVE
                    </div>
                </div>
            </div>
        </div>
    )

}

export default JournalEntryPage