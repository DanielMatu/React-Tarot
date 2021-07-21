const EntryReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_TITLE': 
            return {
                ...state,
                entryTitle: action.payload.newTitle
            }
        case 'UPDATE_DATE': 
            return {
                ...state,
                entryDate: action.payload.newDate
            }
        case 'UPDATE_BODY': 
            return {
                ...state,
                entryBody: action.payload.newBody
            }
        case 'UPDATE_ENTRY_INDEX': 
            return {
                ...state,
                entryIndex: action.payload.newIndex
            }
        case 'UPDATE_FORTUNE': 
            return {
                ...state,
                fortune: action.payload.newFortune
            }
        case 'UPDATE_UNMODIFIED_FORTUNE': 
            return {
                ...state,
                unmodifiedFortune: action.payload.newUnmodifiedFortune
            }
        case 'UPDATE_IS_EDITING': 
            return {
                ...state,
                isEditing: action.payload.newIsEditing
            }
        case 'UPDATE_DECK': 
            return {
                ...state,
                deck: action.payload.newDeck
            }
        case 'UPDATE_UNMODIFIED_DECK': 
            return {
                ...state,
                unmodifiedDeck: action.payload.newUnmodifiedDeck
            }
        case 'UPDATE_DID_SAVE': 
            return {
                ...state,
                didSave: action.payload.newDidSave
            }

    }
}

export default EntryReducer