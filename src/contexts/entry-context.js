import React, { createContext, useReducer } from 'react'
import EntryReducer from './entry-reducer'
const EntryContext = createContext()
export { EntryContext }

const EntryContextProvider = (props) => {
    const { children } = props
                //     title, date, body, index, fortune, isEditing, deck
    const initialState = {entryTitle:'', entryDate:'', entryBody:'', entryIndex:0, fortune:{}, isEditing:false, deck:[]}
    const [entryState, dispatch] = useReducer(EntryReducer, initialState)
    const setTitle = (newTitle) => { dispatch({type: 'UPDATE_TITLE', payload:{newTitle}})} 
    const setDate = (newDate) => dispatch({type: 'UPDATE_DATE', payload:{newDate}})
    const setBody = (newBody) => dispatch({type: 'UPDATE_BODY', payload:{newBody}})
    const setEntryIndex = (newIndex) => dispatch({type: 'UPDATE_ENTRY_INDEX', payload:{newIndex}})
    const setFortune = (newFortune) => dispatch({type: 'UPDATE_FORTUNE', payload:{newFortune}})
    const setIsEditing = (newIsEditing) => dispatch({type: 'UPDATE_IS_EDITING', payload:{newIsEditing}})
    const setDeck = (newDeck) => dispatch({type: 'UPDATE_DECK', payload: {newDeck}})


    return (
        <EntryContext.Provider value={ {entryState, setTitle, setDate, setBody, setEntryIndex, setFortune, setIsEditing, setDeck} }>
            { 
                children 
            }
        </EntryContext.Provider>
    )
}

export default EntryContextProvider