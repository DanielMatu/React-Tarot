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
    const {fortuneState} = useContext(FortuneContext)
    let { displayCardName, displayCardText, displayCardPosition} = fortuneState

    const { entryState, setFortune, setDeck } = useContext(EntryContext)
    const { fortune, deck, unmodifiedFortune, unmodifiedDeck } = entryState
    
    const [fastNavToJournalEntry, setFastNavToJournalEntry] = useState(false)


    const startPull = () => {
        const [newCard, newDeck] = pullOneCard(deck)
        setDeck(newDeck)
        const [row, col, depth] = displayCardPosition
        newCard.depth = depth
        fortune[row][col].push(newCard)
        setFortune(fortune)
    }

    useEffect(() => {
        if (fastNavToJournalEntry){
            console.log('we fast naving')
            setFortune(fortune)
            history.push('/create')
        }
    }, [fastNavToJournalEntry])

    return (
        <div className='fortune-container' >
            <Prompt
                when={!fastNavToJournalEntry }
                message={(location, action) => {
                    return "Your changes haven't been saved, are you sure you want to leave this page?"
                }}
            />
            <div className='layout-section'>
                <Layout />
             </div>
            <div className='display-section'>
                <div className='display-card-container'>
                    <div className='display-card' style={{backgroundImage: 'url("../../public/images/Tarot/' + displayCardName + '.png")', backgroundSize:'cover'}} />
                </div>
                <div className='display-text-container' onClick={() => console.log(deck)}>
                    <textarea readOnly className='display-text' value={displayCardText}></textarea>
                </div>
                <div className='fortune-buttons-container'>

                    <button className='fortune-button fortune-button-add' disabled = {deck.length === 0} onClick={() => startPull()} >
                        {
                            deck.length === 0 &&
                            <div>NO CARDS REMAINING</div>
                        }
                        {
                            deck.length !== 0 &&
                            <div>ADD CARD</div>
                        }
                    </button>
                    <button className='fortune-button fortune-button-post' onClick={() => setFastNavToJournalEntry(true)}>POST IN JOURNAL</button>
                </div>

            </div>
        </div>
    )
}

export default FortunePage