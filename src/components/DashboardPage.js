import React, { useContext, useState } from 'react';
import { history } from '../routers/AppRouter'
import { DateContext } from '../contexts/date-context'
import { EntryContext } from '../contexts/entry-context'
import { FortuneContext } from '../contexts/fortune-context'
import { randomizeNewCelticCross } from '../decks/DeckHelpers'

import { getMonthAndNumDays } from '../actions/calendarUpdatingFuncs';

const DashboardPage = () =>  {
    const [state, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry, editGivenEntry] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state

    const [ entryState, setTitle, setDate, setBody, setEntryIndex, setFortune, setIsEditing ] = useContext(EntryContext)
    const [ title, entryDate, body, fortune, isEditing ] = entryState

    const {fortuneState, setLayout, setDisplayCardName, setDisplayCardText, setHoverCardHeld} = useContext(FortuneContext)
    const {deck, layout, displayCardName, displayCardText, hoverCardHeld} = fortuneState

    // let [ month, numDays ] = getMonthAndNumDays(numericalMonth)
    let [ limitReachedVisible, setLimitReachedVisible ] = useState(false)

    const navigateToCreateIfUnderLimit = (page) => {
        let date = new Date() 
        let currDayNumber = date.getDate()
        let currMonth = date.getMonth() + 1
        let currYear = date.getFullYear()
        let [ stringCurrMonth, numDays ] = getMonthAndNumDays(currMonth)
        let todaysEntries = calendar[currYear][stringCurrMonth][currDayNumber - 1]['entries']
        // if (page == '/create'){
            setTitle('')
            setBody('')
            setFortune({})
            setLayout(randomizeNewCelticCross()[0])
            setDate(stringCurrMonth + " " + (currDayNumber).toString() + " " + currYear.toString() )
            setIsEditing(false)
            setDisplayCardName('')
            setDisplayCardText('')
        // } else if (page == '/fortune'){
            
        // }

        if (!todaysEntries){
            todaysEntries = []
        }
        if(todaysEntries.length >= 3){
            console.log('at limit!')
            setLimitReachedVisible(true)
        } else{
            history.push(page)
        }
    }
    return (
        <div>
            <div className='dashboard-center-container'>
                <div className='dashboard-center-option' onClick={() => navigateToCreateIfUnderLimit('/fortune')}>
                    {
                        !limitReachedVisible &&
                        <>
                            <div className='dashboard-center-option-header'>
                                RECEIVE A FORTUNE
                            </div>
                            <div className='dashboard-center-option-image' id="eye-look-img"/>
                        </>

                    }
                    {
                        limitReachedVisible &&
                        <div className='dashboard-center-option-header'  >
                            MAXIMUM DAILY ENTRIES (3) REACHED
                        </div>
                    }

                </div>
                <div className='dashboard-center-option' onClick={() => navigateToCreateIfUnderLimit('/create')}>
                    {
                        !limitReachedVisible &&
                        <>
                            <div className='dashboard-center-option-header' >
                                CREATE JOURNAL ENTRY
                            </div> 
                            <div className='dashboard-center-option-image' id="read-book-img"/>
                        </>
                    }
                    {
                        limitReachedVisible &&
                        <div className='dashboard-center-option-header'  >
                            MAXIMUM DAILY ENTRIES (3) REACHED
                        </div>
                    }

                </div>  
            </div>
        </div>

    )
}

export default DashboardPage;