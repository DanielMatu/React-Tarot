import React, { useContext } from 'react';
import Day from './Day.js'
import { DateContext } from '../../contexts/date-context'
import { UserContext } from '../../contexts/user-context'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'

const Journal = () => {

    const [ userState, login, logout ] = useContext(UserContext)
    const { uid } = userState
    const { dateState, monthInc, monthDec, yearInc, yearDec } = useContext(DateContext)
    let { calendarMonth, calendarYear, calendar } = dateState
    let [ month, numDays ] = getMonthAndNumDays(calendarMonth)
    let daysOfMonth = calendar[calendarYear][month]

    return (

        <div className='calendar-container'>

            <div className='calendar-header'>
                <div className='calendar-year-display'>
                    <div className='year-label'>Year:</div>
                    <button className='date-nav-button' onClick={() => yearDec(calendarYear)}> &lt; </button>
                    <div className='calendar-year'>{ calendarYear } </div>
                    <button className='date-nav-button' onClick={() => yearInc(calendarYear)}> &gt; </button>
                </div>
                <div className='calendar-month-display'>
                    <div className='month-label'>Month:</div>
                    <button className='date-nav-button' onClick={() => monthDec(calendarMonth, calendarYear)}> &lt; </button>
                    <div className='calendar-month'>{ month } </div>
                    <button className='date-nav-button' onClick={() => monthInc(calendarMonth, calendarYear)}> &gt; </button>
                </div>
            </div>

            <div className="calendar">
                {
                    daysOfMonth.map((day, id) => (
                        <Day key={id} {...day}/>
                    ))
                }

            </div>
        
        </div>


    )

}

export default Journal;