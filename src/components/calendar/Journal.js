import React, { useContext } from 'react';
import Day from './Day.js'
import { DateContext } from '../../contexts/date-context'
import { UserContext } from '../../contexts/user-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'

const Journal = (props) => {

    const [ userState, login, logout ] = useContext(UserContext)
    const { uid } = userState
    const [state, monthInc, monthDec, yearInc, yearDec] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state
    let [ month, numDays ] = getMonthAndNumDays(numericalMonth)
    let daysOfMonth = calendar[year][month]

    return (

        <div className='calendar-container'>

            <div className='calendar-header'>
                <div className='calendar-year-display'>
                    <div className='year-label'>Year:</div>
                    <button className='date-nav-button' onClick={yearDec}> &lt; </button>
                    <div className='calendar-year'>{ year } </div>
                    <button className='date-nav-button' onClick={yearInc}> &gt; </button>
                </div>
                <div className='calendar-month-display'>
                    <div className='month-label'>Month:</div>
                    <button className='date-nav-button' onClick={monthDec}> &lt; </button>
                    <div className='calendar-month'>{ month } </div>
                    <button className='date-nav-button' onClick={monthInc}> &gt; </button>
                </div>
            </div>

            <div className="calendar">
                {
                    daysOfMonth.map((day) => (
                        <Day {...day}/>
                    ))
                }

            </div>
        
        </div>


    )

}

export default Journal;