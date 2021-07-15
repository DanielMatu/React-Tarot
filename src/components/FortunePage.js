import React, { useState } from 'react'
import { history } from '../routers/AppRouter'
import { getStandardDeck } from '../decks/StandardDeck'
import { pullNCards } from '../decks/DeckHelpers'

const FortunePage = () => {
    const deck = getStandardDeck()
    let nineCards = pullNCards(9, deck)
    const [layout, setLayout] = useState(nineCards)
    const [displayCard, setDisplayCard] = useState({name: 'ace of cups'})
    const [displayText, setDisplayText] = useState()
    const updateText = (e) => setDisplayText(e.target.value)
    return (
        <div className='fortune-container'>
            <div className='fortune-layout'>
            </div>
            <div className='display-section'>
                <div className='display-card-container'>
                    <div className='display-card' style={{backgroundImage: 'url("../../public/images/Tarot/' + displayCard.name + '.png")', backgroundSize:'cover'}}>
                    </div>
                </div>
                <textarea className='display-text' value={displayText} onChange={updateText}>
                </textarea>
                <div className='save-button'>
                </div>
            </div>
        </div>
    )
}

export default FortunePage