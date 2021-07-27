const UserReducer = (state, action) => {
    switch (action.type){
        case "LOGIN":
            console.log('login triggered')
            console.log('state before')
            console.log(state)
            console.log('new uid')
            console.log(action.payload.uid)
            return {
                ...state,
                uid: action.payload.uid
            }
        case "LOGOUT":
            console.log('logout triggered')
            console.log('state before')
            console.log(state)
            return {
                ...state,
                uid: null
            }
        case "UPDATE_PLAY":
            return {
                ...state,
                play: action.payload.newPlay
            }
    }
}

export default UserReducer