import React, { useReducer, createContext } from 'react'
import UserReducer from './user-reducer'
const UserContext = createContext()
export { UserContext }

const UserContextProvider = (props) => {
    let { children, uid } = props

    const initialState = { uid: null, play:'play!' }
    const [state, dispatch] = useReducer(UserReducer, initialState)



    const logout = () => dispatch({ type: 'LOGOUT' })
    const login = (uid) => dispatch({ type: 'LOGIN', payload: {uid}})
    const setPlay = (newPlay) => dispatch({ type: 'UPDATE_PLAY', payload: {uid}})
    // console.log('user context initializes this state')
    // console.log(state)


    return (
        <UserContext.Provider value={[state, login, logout, setPlay]}>
            {
                children
            }
        </UserContext.Provider>
    )
}

export default UserContextProvider