import React, { createContext, useReducer } from 'react'
import EntryReducer from './entry-reducer'
const EntryContext = createContext()
export { EntryContext }

const EntryContextProvider = (props) => {
    const { children } = props
    const initialState = {entryTitle:'', entryDate:'', entryBody:'', entryIndex:0, fortune:{}, isEditing:false, deck:[], unmodifiedFortune:{}, unmodifiedDeck:[], didSave:false}
    const [entryState, dispatch] = useReducer(EntryReducer, initialState)
    const setTitle = (newTitle) => { dispatch({type: 'UPDATE_TITLE', payload:{newTitle}})} 
    const setDate = (newDate) => dispatch({type: 'UPDATE_DATE', payload:{newDate}})
    const setBody = (newBody) => dispatch({type: 'UPDATE_BODY', payload:{newBody}})
    const setEntryIndex = (newIndex) => dispatch({type: 'UPDATE_ENTRY_INDEX', payload:{newIndex}})
    const setFortune = (newFortune) => dispatch({type: 'UPDATE_FORTUNE', payload:{newFortune}})
    const setIsEditing = (newIsEditing) => dispatch({type: 'UPDATE_IS_EDITING', payload:{newIsEditing}})
    const setDeck = (newDeck) => dispatch({type: 'UPDATE_DECK', payload: {newDeck}})
    const setUnmodifiedFortune = (newUnmodifiedFortune) => dispatch({type: 'UPDATE_UNMODIFIED_FORTUNE', payload:{newUnmodifiedFortune}})
    const setUnmodifiedDeck = (newUnmodifiedDeck) => dispatch({type: 'UPDATE_UNMODIFIED_DECK', payload:{newUnmodifiedDeck}})
    const setDidSave = (newDidSave) => dispatch({type: 'UPDATE_DID_SAVE', payload:{newDidSave}})



    return (
        <EntryContext.Provider value={ {entryState, setTitle, setDate, setBody, setEntryIndex, setFortune, setIsEditing, setDeck, setUnmodifiedFortune, setUnmodifiedDeck, setDidSave} }>
            { 
                children 
            }
        </EntryContext.Provider>
    )
}

export default EntryContextProvider