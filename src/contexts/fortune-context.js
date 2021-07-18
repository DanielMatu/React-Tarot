import React, { createContext, useReducer } from 'react'
import FortuneReducer from './fortune-reducer'
const FortuneContext = createContext()
export { FortuneContext }
import { getStandardDeck } from '../decks/StandardDeck'
import { pullNCards } from '../decks/DeckHelpers'

const FortuneContextProvider = (props) => {
    const { children } = props
    const deck = getStandardDeck()
    const initialCards = pullNCards(9, deck)
    const celticCross = [[0,initialCards[0],0,initialCards[1]],
                        [initialCards[3],initialCards[4],initialCards[5],initialCards[6]],
                         [0,initialCards[7],0,initialCards[8]]]

    const initialState = {deck, layout: celticCross, displayCardName:'', displayCardText:'', hoverCardHeld: false}
    const [state, dispatch] = useReducer(FortuneReducer, initialState)


    const setLayout = (newLayout) => { dispatch({type: 'UPDATE_LAYOUT', payload:{newLayout}})} 
    const setDisplayCardName = (newDisplayCardName) => dispatch({type: 'UPDATE_DISPLAY_CARD_NAME', payload:{newDisplayCardName}})
    const setDisplayCardText = (newDisplayCardText) => dispatch({type: 'UPDATE_DISPLAY_CARD_TEXT', payload:{newDisplayCardText}})
    const setHoverCardHeld = (newHoverCardHeld) => dispatch({type: 'UPDATE_HOVER_CARD_HELD', payload:{newHoverCardHeld}})


    return (
        <FortuneContext.Provider value={ {state, setLayout, setDisplayCardName, setDisplayCardText, setHoverCardHeld } }>
            { 
                children 
            }
        </FortuneContext.Provider>
    )
}

export default FortuneContextProvider