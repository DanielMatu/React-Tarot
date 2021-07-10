import { firebase, googleAuthProvider } from '../firebase/firebase'

const UserReducer = (state, action) => {
    switch (action.type){
        case "LOGIN":
            return {
                ...state,
                uid: action.payload.uid
            }
        case "LOGOUT":
            return {
                ...state,
                uid: null
            }
        case "UPDATE_CALENAR":
            return {
                ...state,
                calendar: action.payload.calendar
            }
    }
}

export default UserReducer