import React, { useContext, createContext } from 'react'
import Journal from './Journal'
import {DateContext} from '../../contexts/date-context'

const JournalPage = () => {
    let [defaultDay, defaultMonth, defaultYear] = useContext(DateContext)
    let defaultNumDays
    switch(defaultMonth){
        case 1:
            defaultMonth = 'January'
            defaultNumDays = 31
            break
        case 2: 
            defaultMonth = 'February'
            defaultNumDays = 28
            break
        case 3: 
            defaultMonth = 'March'
            defaultNumDays = 31
            break
        case 4: 
            defaultMonth = 'April'
            defaultNumDays = 30
            break
        case 5: 
            defaultMonth = 'May'
            defaultNumDays = 31
            break
        case 6:
            defaultMonth = 'June'
            defaultNumDays = 30
            break
        case 7: 
            defaultMonth = 'July'
            defaultNumDays = 30
            break
        case 8:
            defaultMonth = 'August'
            defaultNumDays = 31
            break
        case 9:
            defaultMonth = 'September'
            defaultNumDays = 30
            break
        case 10:
            defaultMonth = 'October'
            defaultNumDays = 31
            break
        case 11:
            defaultMonth = 'November'
            defaultNumDays = 30
            break
        case 12:
            defaultMonth = 'December'
            defaultNumDays = 31
            break
            
        break
    }

    const journalArgs = {"monthName": defaultMonth, "numDays": defaultNumDays}
    return (
        <div>
            test
                <Journal {...journalArgs} />


        </div>
    )

}

export default JournalPage