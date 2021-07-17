import React, { useState, useContext } from 'react'
import { FortuneContext } from '../../contexts/fortune-context'

const Card = (props) => {
    const {state, setLayout, setDisplayCardName, setDisplayCardText} = useContext(FortuneContext)
    const {deck, layout, displayCardName, displayCardText} = state

    const { row, col, depth, card } = props
    let { name, text, isDummy, isRevealed } = card


    const revealCard = () => {
        if (!isDummy){
            if (!isRevealed){
                isRevealed = true
                layout[row][col][depth].isRevealed = isRevealed
                setLayout(layout)
            }
            setDisplayCardName(name)
            setDisplayCardText(text)
        }

    }

    return (
        <>  
            <div className='card' onClick={() => revealCard()} 
                                style={isRevealed ? {backgroundImage: 'url("../../public/images/Tarot/' + name + '.png")', backgroundSize:'cover'} 
                                             : isDummy ? {background:'none'} : {backgroundImage: 'url("../../public/images/Tarot/cardback.png")', backgroundSize:'cover'} }  />


        </>


    )
}

export default Card