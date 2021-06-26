import React from 'react';
import BackgroundVideo from './BackgroundVideo'

const DashboardPage = () => (
    <div>
    <div className='dashboard-center-container'>
        <div className='dashboard-center-option'>
            <div className='dashboard-center-option-header'>
                RECEIVE A FORTUNE
            </div>
            <img className='dashboard-center-option-image' src="images/eye-look.png"/>

        </div>
        <div className='dashboard-center-option'>
            <div className='dashboard-center-option-header'>
                CREATE JOURNAL ENTRY
            </div>  
            <img className='dashboard-center-option-image' src="images/read-book.png"/>

        </div>  
    </div>
 
    
    </div>

)

export default DashboardPage;