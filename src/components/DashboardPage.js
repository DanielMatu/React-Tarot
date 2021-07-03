import React from 'react';
import img from '../../public/images/read-book.png';


const DashboardPage = () => (
    <div>
    <div className='dashboard-center-container'>
        <div className='dashboard-center-option'>
        <img src='dist/img/read-book.png' />

            <div className='dashboard-center-option-header'>
                RECEIVE A FORTUNE
            </div>
            <div className='dashboard-center-option-image' id="eye-look-img"/>

        </div>
        <div className='dashboard-center-option'>
            <video src = "../../public/videos/bg-sea.mp4" />
            <div className='dashboard-center-option-header'>
                CREATE JOURNAL ENTRY
            </div> 
            <img src={img} /> 
            <div className='dashboard-center-option-image' id="read-book-img"/>
        </div>  
    </div>
 
    
    </div>

)

export default DashboardPage;