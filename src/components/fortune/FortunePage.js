import React, { useState, useEffect, useContext } from 'react'
import { history } from '../../routers/AppRouter'
import { getStandardDeck } from '../../decks/StandardDeck'
import { pullNCards, dragHoverCard } from '../../decks/DeckHelpers'
import { FortuneContext } from '../../contexts/fortune-context'
import { DateContext } from '../../contexts/date-context'
import { EntryContext } from '../../contexts/entry-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'
import Layout from './Layout'

const FortunePage = () => {
    const {state, setLayout, setDisplayCardName, setDisplayCardText, setHoverCardHeld} = useContext(FortuneContext)
    let {deck, layout, displayCardName, displayCardText, hoverCardHeld} = state

    const [dateState, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry, editGivenEntry, setCalendar] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = dateState

    const [ entryState, setTitle, setDate, setBody, setEntryIndex, setFortuneExists, setIsEditing ] = useContext(EntryContext)
    const [ title, entryDate, body, index, fortuneExists, isEditing, entry ] = entryState

    const saveToEntry = () => {
        setLayout(layout)

        let date = new Date() 
        let currDayNumber = date.getDate()
        let currMonth = date.getMonth() + 1
        let currYear = date.getFullYear()
        let [ stringCurrMonth, numDays ] = getMonthAndNumDays(currMonth)
        let todaysEntries = calendar[currYear][stringCurrMonth][currDayNumber - 1]['entries']
        setFortuneExists(true)
        setDate(stringCurrMonth + " " + (currDayNumber).toString() + " " + currYear.toString() )
        // setIsEditing(false)

        dispatch({ type: 'UPDATE_CALENDAR', payload: {calendar}})

        if (!todaysEntries){
            todaysEntries = []
        }

        history.push('/create')
    }



    return (
        <div className='fortune-container'>
            {/* <div className='deck-section'>
                <div className='deck' id='deck' >   


                </div>
            </div> */}
            <div className='layout-section'>
                <Layout />
             </div>
            <div className='display-section'>
                <div className='display-card-container'>
                    {/* <button className='add-card-button'>ADD CARD</button> */}
                    <div className='display-card' style={{backgroundImage: 'url("../../public/images/Tarot/' + displayCardName + '.png")', backgroundSize:'cover'}} />
                </div>
                <div className='display-text-container'>
                    <textarea readOnly className='display-text' value={displayCardText}></textarea>
                </div>
                <div className='save-button-container' onClick={saveToEntry}>
                    <div className='save-button-text' >SAVE AS JOURNAL ENTRY</div>

                </div>
            </div>
        </div>
    )
}

export default FortunePage