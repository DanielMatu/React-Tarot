import React, { useState, useContext } from 'react'
import { history } from '../../routers/AppRouter'
import { getStandardDeck } from '../../decks/StandardDeck'
import { pullNCards } from '../../decks/DeckHelpers'
import { FortuneContext } from '../../contexts/fortune-context'
import Temp from './Temp'
import Layout from './Layout'

const FortunePage = () => {
    const {state, setLayout, setDisplayCardName, setDisplayCardText} = useContext(FortuneContext)
    let {deck, layout, displayCardName, displayCardText} = state




    return (
        <div className='fortune-container'>
            <div className='deck-section'></div>
            <div className='layout-section'>
                <Layout />
             </div>
            <div className='display-section'>
                <div className='display-card-container'>
                    <div className='display-card' style={{backgroundImage: 'url("../../public/images/Tarot/' + displayCardName + '.png")', backgroundSize:'cover'}} />
                </div>
                <div className='display-text-container'>
                    <textarea readOnly className='display-text' value={displayCardText}></textarea>
                </div>
                <div className='save-button'>SAVE AS JOURNAL ENTRY</div>
            </div>
        </div>
    )
}

export default FortunePage