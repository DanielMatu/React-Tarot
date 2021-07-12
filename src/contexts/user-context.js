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
    const db = firebase.database()

    console.log('creating user')
    db.ref(`users/${uid}`).once('value', (snapshot) => {
        if (snapshot.exists()){
        } else {
            db.ref(`users/${uid}`).set({})
        }
    })

    return (
        <UserContext.Provider value={[state, login, logout]}>
            {
                children
            }
        </UserContext.Provider>
    )
}

export default UserContextProvider