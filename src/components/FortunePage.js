import React, { useState } from 'react'
import { history } from '../routers/AppRouter'

const FortunePage = () => {
    const [layout, setLayout] = useState([])
    const [displayCard, setDisplayCard] = useState({imgUrl: 'url("../../public/images/Tarot/ace of cups.png")'})
    const [displayText, setDisplayText] = useState()
    const updateText = (e) => setDisplayText(e.target.value)
    return (
        <div className='fortune-container'>
            <div className='fortune-layout'>
            </div>
            <div className='display-section'>
                <div className='display-card-container'>
                    <div className='display-card' style={{backgroundImage: displayCard.imgUrl, backgroundSize:'cover'}}>
                    </div>
                </div>
                <textarea className='display-text' value={displayText} onChange={updateText}>
                </textarea>
                <div className='save-button'>
                </div>
            </div>
        </div>
    )
}

export default FortunePage