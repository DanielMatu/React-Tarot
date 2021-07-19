import React, { createContext, useReducer } from 'react'
import EntryReducer from './entry-reducer'
const EntryContext = createContext()
export { EntryContext }

const EntryContextProvider = (props) => {
    const { children } = props
                //     title, date, body, fortuneExists, isEditing, entry
    const initialState = ['', '', '', 0, false, false]
    const [state, dispatch] = useReducer(EntryReducer, initialState)
    const setTitle = (newTitle) => { dispatch({type: 'UPDATE_TITLE', payload:{newTitle}})} 
    const setDate = (newDate) => dispatch({type: 'UPDATE_DATE', payload:{newDate}})
    const setBody = (newBody) => dispatch({type: 'UPDATE_BODY', payload:{newBody}})
    const setEntryIndex = (newIndex) => dispatch({type: 'UPDATE_ENTRY_INDEX', payload:{newIndex}})
    const setFortune = (newFortune) => dispatch({type: 'UPDATE_FORTUNE', payload:{newFortune}})
    const setIsEditing = (newIsEditing) => dispatch({type: 'UPDATE_IS_EDITING', payload:{newIsEditing}})


    return (
        <EntryContext.Provider value={ [state, setTitle, setDate, setBody, setEntryIndex, setFortune, setIsEditing] }>
            { 
                children 
            }
        </EntryContext.Provider>
    )
}

export default EntryContextProvider