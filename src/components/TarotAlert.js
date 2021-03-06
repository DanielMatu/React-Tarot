import React from 'react';
import { history } from '../routers/AppRouter'

const TarotAlert = (props) =>  {
    const {alertText, goBackHandler, buttonText='Go back'} = props
    return (
    <div className='tarot-alert-overlay'>
        <div className='tarot-alert-container'>
            <div className='tarot-alert-box'>
                <div className='tarot-alert-text'>
                    {alertText}

                </div>
                <button className='tarot-alert-return' onClick={() => goBackHandler()}>{buttonText}</button>

            </div>
        </div>
    </div>
    )
}

export default TarotAlert;