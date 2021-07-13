import React, { useContext } from 'react'
import { DateContext } from '../../contexts/date-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'


const CreateJournalEntryPage = () => {
    let [state, monthInc, monthDec, yearInc, yearDec] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state
    let [ stringMonth, numDays ] = getMonthAndNumDays(numericalMonth) 
    let entryTitle = "entry title"
    let entryDate = "Jan 8 920"
    let entryText = 'here is some text'

    return (
        <div className = 'create-entry-wrapper'>
            <div className='create-entry-container'>
                <div className='half-entry text-entry'>
                    <textarea className='entry-text-area entry-title' value={entryTitle}></textarea>
                    <textarea className='entry-text-area entry-date' value={entryDate}></textarea>

                    <textarea className='entry-text-area text-area-body' >

                    </textarea>
                </div>
                <div className='book-spine'></div>
                <div className='half-entry bottom-entry'>
                    <div className='entry-button view-fortune-button'>
                        VIEW FORTUNE
                    </div>
                    <div className='entry-button save-button'>
                        SAVE
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateJournalEntryPage