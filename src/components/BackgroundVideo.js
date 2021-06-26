import React from 'react';

export const BackgroundVideo = ({ url }) => {
    return (
        <div>
            <video className='bg-video' src = {url} autoPlay muted loop>
            </video>
        </div>
    )

}

export default BackgroundVideo