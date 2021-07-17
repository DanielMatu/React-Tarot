const FortuneReducer = (state, action) => {
    switch(action.type) {
        case "UPDATE_LAYOUT":
            console.log('new layout')
            return {
                layout: action.payload.newLayout,
                ...state
            }
        case "UPDATE_DISPLAY_CARD_NAME":
            console.log('updating name')
            console.log(action.payload.newDisplayCardName)
            return {
                displayCardName: action.payload.newDisplayCardName,
                ...state
            }
        case "UPDATE_DISPLAY_CARD_TEXT":
            console.log('updating text')
            console.log(action.payload.newDisplayCardText)

            return {
                displayCardText: action.payload.newDisplayCardText,
                ...state
            }

    }
}

export default FortuneReducer