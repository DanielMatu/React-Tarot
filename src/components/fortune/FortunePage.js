import React, { useState, useEffect, useContext } from 'react'
import { history } from '../../routers/AppRouter'
import { getStandardDeck } from '../../decks/StandardDeck'
import { pullNCards, dragHoverCard, pullOneCard } from '../../decks/DeckHelpers'
import { FortuneContext } from '../../contexts/fortune-context'
import { DateContext } from '../../contexts/date-context'
import { EntryContext } from '../../contexts/entry-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'
import Layout from './Layout'
import { Prompt } from 'react-router'


const FortunePage = () => {
    const {fortuneState, setLayout, setDisplayCardName, setDisplayCardText, setHoverCardHeld, setDisplayCardPosition, setDeck} = useContext(FortuneContext)
    let {deck, layout, displayCardName, displayCardText, hoverCardHeld, displayCardPosition} = fortuneState

    const [dateState, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry, editGivenEntry, setCalendar] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = dateState

    const [ entryState, setTitle, setDate, setBody, setEntryIndex, setFortune, setIsEditing ] = useContext(EntryContext)
    const [ title, entryDate, body, index, fortune, isEditing, entry ] = entryState
    
    const [fastNavToJournalEntry, setFastNavToJournalEntry] = useState(false)


    const startPull = () => {
        const [newCard, newDeck] = pullOneCard(deck)
        setDeck(newDeck)
        const [row, col, depth] = displayCardPosition
        newCard.depth = depth
        layout[row][col].push(newCard)
        setLayout(layout)
    }

    useEffect(() => {
        if (fastNavToJournalEntry){
            console.log('we fast naving')
            setFortune(layout)
            history.push('/create')
        }
    }, [fastNavToJournalEntry])

    return (
        <div className='fortune-container'>
            <Prompt
                when={!fastNavToJournalEntry }
                message={
                    location => `Your changes haven't been saved, are you sure you want to leave this page?`
                }
            />
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
                <div className='fortune-buttons-container'>

                    <button className='fortune-button fortune-button-add' onClick={() => startPull()} >ADD CARD</button>
                    <button className='fortune-button fortune-button-post' onClick={() => setFastNavToJournalEntry(true)}>POST IN JOURNAL</button>
                </div>

            </div>
        </div>
    )
}

export default FortunePage