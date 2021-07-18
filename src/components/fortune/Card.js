import React, { useState, useContext } from 'react'
import { FortuneContext } from '../../contexts/fortune-context'

const Card = (props) => {
    const {state, setLayout, setDisplayCardName, setDisplayCardText, setHoverCardHeld} = useContext(FortuneContext)
    const {deck, layout, displayCardName, displayCardText, hoverCardHeld} = state

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

    const placeNewCard = () => {
        if (hoverCardHeld){
            console.log('placed new card')
        }
    }


    return (

        <div className={isDummy ? 'card' : 'card nonDummyCard'}
                onMouseUp={() => isDummy ? () => {} : placeNewCard()}
                onClick={() => revealCard()} 
                style={isRevealed ? {backgroundImage: 'url("../../public/images/Tarot/' + name + '.png")', backgroundSize:'cover'} 
                                : isDummy ? {background:'none'} 
                                          : {backgroundImage: 'url("../../public/images/Tarot/cardback.png")', backgroundSize:'cover'} }  
        />




    )
}

export default Card