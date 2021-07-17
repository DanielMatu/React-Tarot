import React, { useState, useContext } from 'react'
import { FortuneContext } from '../../contexts/fortune-context'

const Card = (props) => {
    const {state, setLayout, setDisplayCardName, setDisplayCardText} = useContext(FortuneContext)
    const {deck, layout, displayCardName, displayCardText} = state

    const { row, col, depth, card } = props
    let { name, text, isDummy, isRevealed } = card
    
    console.log('heres card')
    console.log(card)

    const revealCard = () => {
        if (!isRevealed){
            isRevealed = true
            layout[row][col][depth].isRevealed = isRevealed
            setLayout(layout)
        }
    }

    return (
        <>  
            <div className='card' onClick={() => revealCard()}>
            {
                name
            }

            </div>

        </>


    )
}

export default Card