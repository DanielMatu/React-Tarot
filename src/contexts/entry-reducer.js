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
        case 'UPDATE_ENTRY_INDEX': 
            state[3] = action.payload.newIndex
            return [
                ...state
            ]
        case 'UPDATE_FORTUNE': 
            state[4] = action.payload.newFortune
            return [
                ...state
            ]
        case 'UPDATE_IS_EDITING': 
            state[5] = action.payload.newIsEditing
            return [
                ...state
            ]

    }
}

export default EntryReducer