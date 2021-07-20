const FortuneReducer = (state, action) => {
    switch(action.type) {
        case "UPDATE_LAYOUT":
            return {
                ...state, 
                layout: action.payload.newLayout
            }
        case "UPDATE_DISPLAY_CARD_NAME":
            return {
                ...state,
                displayCardName: action.payload.newDisplayCardName
            }
        case "UPDATE_DISPLAY_CARD_TEXT":
            return {
                ...state,
                displayCardText: action.payload.newDisplayCardText
            }
        case "UPDATE_HOVER_CARD_HELD":
            return {
                ...state,
                hoverCardHeld: action.payload.newHoverCardHeld
            }
        case "UPDATE_DECK":
            return {
                ...state,
                deck: action.payload.newDeck
            }
        case "UPDATE_DISPLAY_CARD_POSITION":
            
            return {
                ...state,
                displayCardPosition: action.payload.newPosition
            }

    }
}

export default FortuneReducer