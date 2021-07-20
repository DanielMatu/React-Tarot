import { getStandardDeck } from "./StandardDeck"

export const pullNCards = (n, deck) => {
    let nCards = []
    let len = deck.length 
    let randomIndex
    let removedCard
    for (let i = 0; i < n; i++){
        randomIndex = Math.floor(Math.random()*(len--))
        removedCard = deck.splice(randomIndex, 1)
        nCards.push(removedCard)
        // console.log('the removed card is ')
        // console.log(removedCard)

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

export const pullOneCard = (deck) => {
    const randomIndex = Math.floor(Math.random()*(deck.length))
    const newCard = deck.splice(randomIndex, 1)
    return [...newCard, deck]
}
