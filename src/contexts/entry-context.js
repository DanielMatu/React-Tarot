import React, { createContext, useReducer } from 'react'
import EntryReducer from './entry-reducer'
const EntryContext = createContext()
export { EntryContext }

const EntryContextProvider = (props) => {
    const { children } = props
                //     title, date, body, fortuneExists
    const initialState = ['', '', '', false]
    const [state, dispatch] = useReducer(EntryReducer, initialState)
    //                                            type: 'UPDATE_TITLE', payload:{newTitle}

    const setTitle = (newTitle) => {
                            dispatch(
                            {
                                type: 'UPDATE_TITLE', payload:{newTitle}
                            })
                            console.log('state immediately after settitle')
                            console.log(state)

    } 

    console.log('state after setitle')
    console.log(state)
    const setDate = (newDate) => dispatch({type: 'UPDATE_DATE', payload:{newDate}})
    const setBody = (newBody) => dispatch({type: 'UPDATE_BODY', payload:{newBody}})
    const setFortuneExists = (newFortuneExists) => dispatch({type: 'UPDATE_FORTUNE_EXISTS', payload:{newFortuneExists}})
    console.log('state after remaining func declarations')
    console.log(state)

    return (
        <EntryContext.Provider value={ [state, setTitle, setDate, setBody, setFortuneExists] }>
            {console.log('state in provider')}
            {console.log(setTitle)}
            { 
                children 
            }
        </EntryContext.Provider>
    )
}

export default EntryContextProvider