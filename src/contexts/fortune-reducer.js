const FortuneReducer = (state, action) => {
    switch(action.type) {
        case "UPDATE_LAYOUT":
            console.log('new layout')
            return {
                layout: action.payload.newLayout,
                ...state
            }
        case "UPDATE_DISPLAY_CARD_NAME":
            return {
                displayCardName: action.payload.newDisplayCardName,
                ...state
            }
        case "UPDATE_DISPLAY_CARD_TEXT":
            return {
                displayCardText: action.payload.newDisplayCardText,
                ...state
            }

    }
}

export default FortuneReducer