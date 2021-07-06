import React from 'react';
import Day from './Day.js'

// month = { daysOfMonth, monthName, numDays }
// day = ({ dayNum, arrOfEntries })

// {
//     "1": { 
//         []
//     }
// }

const generateEmptyMonth = (numDays) => {
    let daysOfMonth = []
    for (let i = 0; i < numDays; i++) {
        const stringifiedDayNumber = String(i + 1)
        daysOfMonth.push({dayNumber: stringifiedDayNumber, entryPreviews:['one entry']})
    }
    return daysOfMonth
}

const Journal = (props) => {

    const {monthName, numDays, daysOfMonth = generateEmptyMonth(numDays)} = props
    // console.log ('heres the days of month')
    // console.log(daysOfMonth)
    // console.log('heres the spread days of month')
    // console.log(...daysOfMonth)
    return (
        <div className='calendar-container'>
            
            <div className="calendar">
                { monthName } 
                {
                    daysOfMonth.map((day, index) => (
                        <Day key={index} {...day}/>
                    ))
                }
            </div>
        
        </div>
    )

}

export default Journal;