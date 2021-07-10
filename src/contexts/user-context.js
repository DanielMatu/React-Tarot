import React, { useReducer, createContext } from 'react'
import UserReducer from './user-reducer'
import { firebase } from '../firebase/firebase'
const UserContext = createContext()
export { UserContext }

// maybe ...children instead of chilren 
const UserContextProvider = (props) => {
    let {uid, children} = props
    const initialState = { uid }
    const [state, dispatch] = useReducer(UserReducer, initialState)
    const logout = () => dispatch({ type: 'LOGOUT' })
    const login = (uid) => dispatch({ type: 'LOGIN', payload: {uid}}) 
    return (
        <UserContext.Provider value={[state, login, logout]}>
            {
                children
            }
        </UserContext.Provider>
    )
}

export default UserContextProvider