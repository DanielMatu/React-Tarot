import React, { useState, useEffect, useContext } from 'react'
import { history } from '../../routers/AppRouter'
import { getStandardDeck } from '../../decks/StandardDeck'
import { pullNCards, dragHoverCard } from '../../decks/DeckHelpers'
import { FortuneContext } from '../../contexts/fortune-context'
import Layout from './Layout'

const FortunePage = () => {
    const {state, setLayout, setDisplayCardName, setDisplayCardText, setHoverCardHeld} = useContext(FortuneContext)
    let {deck, layout, displayCardName, displayCardText, hoverCardHeld} = state





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
                <div className='save-button-container'>
                    <div className='save-button-text'>SAVE AS JOURNAL ENTRY</div>

                </div>
            </div>
        </div>
    )
}

export default FortunePage