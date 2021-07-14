const EntryReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_TITLE': 
            state[0] = action.payload.newTitle
            return [
                ...state
            ]
        case 'UPDATE_DATE': 
            state[1] = action.payload.newDate
            return [
                ...state
            ]
        case 'UPDATE_BODY': 
            state[2] = action.payload.newBody
            return [
                ...state
            ]
        case 'UPDATE_FORTUNE_EXISTS': 
            state[3] = action.payload.newFortuneExists
            return [
                ...state
            ]
        case 'UPDATE_IS_EDITING': 
            state[4] = action.payload.newIsEditing
            return [
                ...state
            ]
        case 'UPDATE_ENTRY': 
            state[5] = action.payload.newEntry
            return [
                ...state
            ]
    }
}

export default EntryReducer