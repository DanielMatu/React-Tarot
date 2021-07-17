const FortuneReducer = (state, action) => {
    switch(action.type) {
        case "UPDATE_LAYOUT":
            console.log('new layout')
            return {
                ...state, 
                layout: action.payload.newLayout
            }
        case "UPDATE_DISPLAY_CARD_NAME":
            // console.log('updating name')
            // console.log(action.payload.newDisplayCardName)
            return {
                ...state,
                displayCardName: action.payload.newDisplayCardName
            }
        case "UPDATE_DISPLAY_CARD_TEXT":
            // console.log('updating text')
            // console.log(action.payload.newDisplayCardText)
            return {
                ...state,
                displayCardText: action.payload.newDisplayCardText
            }

    }
}

export default FortuneReducer