import React, { useState, createContext } from 'react'

const DateContext = createContext()
export { DateContext }

const DateContextProvider = ({ children }) => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return (
        <DateContext.Provider value={[day, month, year]}>
            {
                children
            }
        </DateContext.Provider>
    )
}

export default DateContextProvider