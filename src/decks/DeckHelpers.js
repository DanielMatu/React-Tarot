import { getStandardDeck } from "./StandardDeck"

export const pullNCards = (n, deck) => {
    let nCards = []
    let len = deck.length 
    let randomIndex
    for (let i = 0; i < n; i++){
        randomIndex = Math.floor(Math.random()*(len--))
        nCards.push(deck.splice(randomIndex, 1))

    }
    return nCards
}


export const randomizeNewCelticCross = () => {
    const deck = getStandardDeck()
    const initialCards = pullNCards(9, deck)
    const celticCross = [[0,initialCards[0],0,initialCards[1]],
                        [initialCards[3],initialCards[4],initialCards[5],initialCards[6]],
                         [0,initialCards[7],0,initialCards[8]]]
    return [celticCross, deck]
}

