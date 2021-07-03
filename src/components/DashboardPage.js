import React from 'react';
import BackgroundVideo from './BackgroundVideo'

const DashboardPage = () => (
    <div>
    <div className='dashboard-center-container'>
        <div className='dashboard-center-option'>
            <div className='dashboard-center-option-header'>
                RECEIVE A FORTUNE
            </div>
            <div className='dashboard-center-option-image' id="eye-look-img"/>

        </div>
        <div className='dashboard-center-option'>
            <div className='dashboard-center-option-header'>
                CREATE JOURNAL ENTRY
                <img src='public/images/read-book.png'></img>
            </div>  
            <div className='dashboard-center-option-image' id="read-book-img"/>

        </div>  
    </div>
 
    
    </div>

)

export default DashboardPage;