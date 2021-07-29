import React, { useContext } from 'react'
import { FortuneContext } from '../../contexts/fortune-context'
import { EntryContext } from '../../contexts/entry-context'

const Card = (props) => {
    const { setDisplayCardName, setDisplayCardText, setDisplayCardPosition} = useContext(FortuneContext)

    const { entryState, setFortune } = useContext(EntryContext)
    const { fortune } = entryState

    const { row, col, depth, card, label } = props
    let { name, text, isDummy, isRevealed } = card


    const revealCard = e => {
        if (!isDummy){
            if (!isRevealed){
                e.target.style.transition = '0.5s' 
                e.target.style.transform = 'rotateY(360deg)' 

                isRevealed = true
                fortune[row][col][depth].isRevealed = isRevealed
                setFortune(fortune)

                setTimeout(() => {
                    setDisplayCardName(name)
                    setDisplayCardText(text)
                    setDisplayCardPosition([row, col, depth])
    
                }, 400)
            } else {
                setDisplayCardName(name)
                setDisplayCardText(text)     
                setDisplayCardPosition([row, col, depth])
            }
        }
    }
    let cardImagePath = process.env.NODE_ENV === 'development' ? '"../../public/images/Tarot/' : '"dist/img/'
    let cardbackBackgroundImageUrl = process.env.NODE_ENV === 'development' ? 'url("../../public/images/Tarot/cardback.png")' 
                                                                       : 'url("dist/img/cardback.png")'



    return (
        
        <div className='card-container' style={(depth === 0) ? {} :{zIndex:'2'}}>
            <div className={(isDummy ? 'card' : 'card nonDummyCard') + (depth === 0 ? '' : ' overlayed-card')}
                    label={label}
                    onClick={(e) => revealCard(e)} 
                    style={
                            isRevealed ? {backgroundImage: 'url(' + cardImagePath + name + '.png")', backgroundSize:'cover'} 
                                       : isDummy ? {background:'none'} 
                                                 : {backgroundImage: cardbackBackgroundImageUrl, backgroundSize:'cover'} }  
            />
            {
                (depth === 0) && 
                <div className='card-label'>{label}</div>

            }
        </div>





    )
}

export default Card