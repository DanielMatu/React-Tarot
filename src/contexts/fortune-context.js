import React, { createContext, useReducer } from 'react'
import FortuneReducer from './fortune-reducer'
const FortuneContext = createContext()
export { FortuneContext }
import { getStandardDeck } from '../decks/StandardDeck'
import { pullNCards, randomizeNewCelticCross } from '../decks/DeckHelpers'

const FortuneContextProvider = (props) => {
    const { children } = props

    const [celticCross, deck] = randomizeNewCelticCross()
    const initialState = {deck, layout: celticCross, displayCardName:'', displayCardText:'', hoverCardHeld: false}
    const [fortuneState, dispatch] = useReducer(FortuneReducer, initialState)

    const setLayout = (newLayout) => { dispatch({type: 'UPDATE_LAYOUT', payload:{newLayout}})} 
    const setDisplayCardName = (newDisplayCardName) => dispatch({type: 'UPDATE_DISPLAY_CARD_NAME', payload:{newDisplayCardName}})
    const setDisplayCardText = (newDisplayCardText) => dispatch({type: 'UPDATE_DISPLAY_CARD_TEXT', payload:{newDisplayCardText}})
    const setHoverCardHeld = (newHoverCardHeld) => dispatch({type: 'UPDATE_HOVER_CARD_HELD', payload:{newHoverCardHeld}})


    return (
        <FortuneContext.Provider value={ {fortuneState, setLayout, setDisplayCardName, setDisplayCardText, setHoverCardHeld } }>
            { 
                children 
            }
        </FortuneContext.Provider>
    )
}

export default FortuneContextProvider