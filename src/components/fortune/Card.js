import React, { useState, useContext } from 'react'
import { FortuneContext } from '../../contexts/fortune-context'

const Card = (props) => {
    const {fortuneState, setLayout, setDisplayCardName, setDisplayCardText, setHoverCardHeld} = useContext(FortuneContext)
    const {deck, layout, displayCardName, displayCardText, hoverCardHeld} = fortuneState

    const { row, col, depth, card, label } = props
    let { name, text, isDummy, isRevealed } = card


    const revealCard = e => {
        if (!isDummy){
            if (!isRevealed){
                e.target.style.backgroundColor = 'green'
                e.target.style.transition = '0.5s' 
                e.target.style.transform = 'rotateY(360deg)' 

                isRevealed = true
                layout[row][col][depth].isRevealed = isRevealed
                setLayout(layout)

                setTimeout(() => {
                    setDisplayCardName(name)
                    setDisplayCardText(text)
    
                }, 400)
            } else {
                setDisplayCardName(name)
                setDisplayCardText(text)         
            }

        }

    }

    const placeNewCard = () => {
        if (hoverCardHeld){
            console.log('placed new card')
        }
    }


    return (

        <div className='card-container'>
            <div className={isDummy ? 'card' : 'card nonDummyCard'}
                    label={label}
                    onMouseUp={() => isDummy ? () => {} : placeNewCard()}
                    onClick={(e) => revealCard(e)} 
                    style={isRevealed ? {backgroundImage: 'url("../../public/images/Tarot/' + name + '.png")', backgroundSize:'cover'} 
                                    : isDummy ? {background:'none'} 
                                            : {backgroundImage: 'url("../../public/images/Tarot/cardback.png")', backgroundSize:'cover'} }  
            />
            <div className='card-label'>{label}</div>
        </div>





    )
}

export default Card