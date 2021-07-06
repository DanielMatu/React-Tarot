import React, { useReducer, createContext } from 'react'
const UserContext = createContext()
export { UserContext }

const UserContextProvider = ({ children }) => {
// define dispatch functions

    return (
        // put them in value
        <UserContext.Provider value={[day, month, year]}>
            {
                children
            }
        </UserContext.Provider>
    )
}

export default UserContextProvider