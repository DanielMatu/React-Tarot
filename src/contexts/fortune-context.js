import React, { createContext, useReducer } from 'react'
import FortuneReducer from './fortune-reducer'
const FortuneContext = createContext()
export { FortuneContext }
import { getStandardDeck } from '../decks/StandardDeck'
import { pullNCards, randomizeNewCelticCross } from '../decks/DeckHelpers'

const FortuneContextProvider = (props) => {
    const { children } = props


    // const [celticCross, deck] = randomizeNewCelticCross()
    const initialState = {displayCardName:'', displayCardText:''}
    const [fortuneState, dispatch] = useReducer(FortuneReducer, initialState)


    const setDisplayCardName = (newDisplayCardName) => dispatch({type: 'UPDATE_DISPLAY_CARD_NAME', payload:{newDisplayCardName}})
    const setDisplayCardText = (newDisplayCardText) => dispatch({type: 'UPDATE_DISPLAY_CARD_TEXT', payload:{newDisplayCardText}})
    const setDisplayCardPosition = (newPosition) => dispatch({type: 'UPDATE_DISPLAY_CARD_POSITION', payload:{newPosition}})


    return (
        <FortuneContext.Provider value={ {fortuneState, setDisplayCardName, setDisplayCardText, setDisplayCardPosition } }>
            { 
                children 
            }
        </FortuneContext.Provider>
    )
}

export default FortuneContextProvider