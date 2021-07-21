import React, { useState, useContext } from 'react'
import { history } from '../../routers/AppRouter'
import { getStandardDeck } from '../../decks/StandardDeck'
import { pullNCards } from '../../decks/DeckHelpers'
import { FortuneContext } from '../../contexts/fortune-context'
import { EntryContext } from '../../contexts/entry-context'
import Card from './Card'

const Layout = () => {
    const {fortuneState, setDisplayCardName, setDisplayCardText} = useContext(FortuneContext)
    const {displayCardName, displayCardText} = fortuneState

    const { entryState } = useContext(EntryContext)
    const { fortune } = entryState
    const labels = [1,2,3,4,5,6,7,8,9]
    let realCardsId = 0
    let id = 0

    return (
        <div className='fortune-layout'>

            {
                fortune.map((row, rowIndex) => <div key={rowIndex} className='row'>
                    {
                    row.map((slot, colIndex) => 
                        
                        slot !== 0 ? slot.map((card, depth) => (
                            <Card 
                                key={id++} 
                                row={rowIndex} 
                                col={colIndex} 
                                depth={depth} 
                                card={card} 
                                label={(depth === 0) ? labels[realCardsId++] : ''}
                                // style={(depth === 0) ? {marginLeft: '-15rem'} : {marginLeft: '-15rem'}}
                                style={{marginLeft: '-135rem'}}
                            />
                        ))
                        
                        :
                        <Card key={id++} row={rowIndex} col={colIndex} depth={0} card={{isDummy:true}} />
                        
                    )}
                 </div>)
            }
        </div>

    )
}

export default Layout