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




