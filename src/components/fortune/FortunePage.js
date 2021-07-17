import React, { useState, useContext } from 'react'
import { history } from '../../routers/AppRouter'
import { getStandardDeck } from '../../decks/StandardDeck'
import { pullNCards } from '../../decks/DeckHelpers'
import { FortuneContext } from '../../contexts/fortune-context'
import Temp from './Temp'
import Layout from './Layout'

const FortunePage = () => {
    const {state, setLayout, setDisplayCardName, setDisplayCardText} = useContext(FortuneContext)
    const {deck, layout, displayCardName, displayCardText} = state


    const updateText = (e) => setDisplayCardText(e.target.value)

    return (
        <div className='fortune-container'>
            <div className='deck-section'></div>
            <div className='layout-section'>
                <Layout />
             </div>
            <div className='display-section'>
                <div className='display-card-container'>
                    <div className='display-card' style={{backgroundImage: 'url("../../public/images/Tarot/' + displayCardName + '.png")', backgroundSize:'cover'}}>
                    </div>
                </div>
                <textarea className='display-text' value={displayCardText} onChange={updateText}>
                </textarea>
                <div className='save-button'>
                </div>
            </div>
        </div>
    )
}

export default FortunePage