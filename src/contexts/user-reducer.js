const UserReducer = (state, action) => {
    switch (action.type){
        case "LOGIN":
            console.log('login triggered')
            return {
                ...state,
                uid: action.payload.uid
            }
        case "LOGOUT":
            console.log('logout triggered')

            return {
                ...state,
                uid: ''
            }
    }
}

export default UserReducer