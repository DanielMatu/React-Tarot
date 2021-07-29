import React, { useState, useContext } from 'react'
import { history } from '../../routers/AppRouter'
import { getStandardDeck } from '../../decks/StandardDeck'
import { pullNCards } from '../../decks/DeckHelpers'
import { FortuneContext } from '../../contexts/fortune-context'
import { EntryContext } from '../../contexts/entry-context'
import Card from './Card'
import Slot from './Slot'

const Layout = () => {
    const { entryState } = useContext(EntryContext)
    const { fortune } = entryState
    const labels = ['The Mind','The Mind','Final Outcome','The Surprise','The Soul','The Future','The Heart','The Problem', 'The Family']
    let id = 0
    let slotId = 0

    return (
        <div className='fortune-layout'>

            {
                fortune.map((row, rowIndex) => <div key={rowIndex} className='row'>
                    {
                    row.map((slot, colIndex) => 
                        
                        slot !== 0 ? 
                        <Slot slot={slot} row={rowIndex} col={colIndex} slotId={slotId++} label={labels[slotId]}/>
                        :
                        <Card key={id++} row={rowIndex} col={colIndex} depth={0} card={{isDummy:true}} />
                        
                    )}
                 </div>)
            }
        </div>

    )
}

export default Layout