import React, { useState, useContext } from 'react'
import { history } from '../../routers/AppRouter'
import { getStandardDeck } from '../../decks/StandardDeck'
import { pullNCards } from '../../decks/DeckHelpers'
import { FortuneContext } from '../../contexts/fortune-context'
import Card from './Card'

const Layout = () => {
    const {state, setLayout, setDisplayCardName, setDisplayCardText} = useContext(FortuneContext)
    const {deck, layout, displayCardName, displayCardText} = state
    const labels = [1,2,3,4,5,6,7,8,9]
    let realCardsId = 0
    let id = 0

    return (
        <div className='fortune-layout'>

            {
                layout.map((row, rowIndex) => <div key={rowIndex} className='row'>
                    {
                    row.map((slot, colIndex) => layout[rowIndex][colIndex] !== 0 ? 

                    <Card 
                        key={id++} 
                        row={rowIndex} 
                        col={colIndex} 
                        depth={0} 
                        card={layout[rowIndex][colIndex][0]} 
                        label={realCardsId++}
                    />

                    : <Card key={id++} row={rowIndex} col={colIndex} depth={0} card={{isDummy:true}} />
                    )}
                 </div>)
            }
        </div>

    )
}

export default Layout