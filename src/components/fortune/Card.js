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
            setDisplayCardName(name)
            setDisplayCardText(text)
            setLayout(layout)
        }
    }

    return (
        <>  
            <div className='card' onClick={() => revealCard()} 
                                style={isRevealed ? {backgroundImage: 'url("../../public/images/Tarot/' + name + '.png")', backgroundSize:'cover'} 
                                                  : {background:'rgba(green,0.3)'}}  >

            </div>

        </>


    )
}

export default Card