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

    const initialState = {deck, layout: celticCross, displayCardName:'', displayCardText:''}
    const [state, dispatch] = useReducer(FortuneReducer, initialState)


    const setLayout = (newLayout) => { dispatch({type: 'UPDATE_LAYOUT', payload:{newLayout}})} 
    const setDisplayCardName = (newDisplayCardName) => dispatch({type: 'UPDATE_DISPLAY_CARD_NAME', payload:{newDisplayCardName}})
    const setDisplayCardText = (newDisplayCardText) => dispatch({type: 'UPDATE_DISPLAY_CARD_TEXT', payload:{newDisplayCardText}})
    const setCards = (newCards) => dispatch({type: 'UPDATE_CARDS', payload:{newCards}})

    // const setFortuneExists = (newFortuneExists) => dispatch({type: 'UPDATE_FORTUNE_EXISTS', payload:{newFortuneExists}})
    // const setIsEditing = (newIsEditing) => dispatch({type: 'UPDATE_IS_EDITING', payload:{newIsEditing}})


    return (
        <FortuneContext.Provider value={ {state, setLayout, setDisplayCardName, setDisplayCardText, setCards } }>
            { 
                children 
            }
        </FortuneContext.Provider>
    )
}

export default FortuneContextProvider