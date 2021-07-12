import React, { useContext } from 'react';
import { history } from '../routers/AppRouter'

const DashboardPage = () =>  {
    return (
        <div>
            <div className='dashboard-center-container'>
                <div className='dashboard-center-option'>
                    <div className='dashboard-center-option-header'>
                        RECEIVE A FORTUNE
                    </div>
                    <div className='dashboard-center-option-image' id="eye-look-img"/>

                </div>
                <div className='dashboard-center-option' onClick={() => history.push('/create')}>
                    <div className='dashboard-center-option-header' >
                        CREATE JOURNAL ENTRY
                    </div> 
                    <div className='dashboard-center-option-image' id="read-book-img"/>
                </div>  
            </div>
        </div>

    )
}

export default DashboardPage;