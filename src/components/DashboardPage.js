import React, { useContext, useState } from 'react';
import { history } from '../routers/AppRouter'
import { DateContext } from '../contexts/date-context'
import { EntryContext } from '../contexts/entry-context'
import { getMonthAndNumDays } from '../actions/calendarUpdatingFuncs';

const DashboardPage = () =>  {
    const [state, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry, editGivenEntry] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state

    const [ entryState, setTitle, setDate, setBody, setEntryIndex, setFortuneExists, setIsEditing ] = useContext(EntryContext)
    const [ title, entryDate, body, fortuneExists, isEditing ] = entryState

    // let [ month, numDays ] = getMonthAndNumDays(numericalMonth)
    let [ limitReachedVisible, setLimitReachedVisible ] = useState(false)

    const navigateToCreateIfUnderLimit = () => {
        let date = new Date() 
        let currDayNumber = date.getDate()
        let currMonth = date.getMonth() + 1
        let currYear = date.getFullYear()
        let [ stringCurrMonth, numDays ] = getMonthAndNumDays(currMonth)
        let todaysEntries = calendar[currYear][stringCurrMonth][currDayNumber - 1]['entries']
        setTitle('')
        setBody('')
        setFortuneExists(false)
        setDate(stringCurrMonth + " " + (currDayNumber).toString() + " " + currYear.toString() )
        setIsEditing(false)
        if (!todaysEntries){
            todaysEntries = []
        }
        if(todaysEntries.length >= 3){
            console.log('at limit!')
            setLimitReachedVisible(true)
        } else{
            history.push('/create')
        }
    }
    return (
        <div>
            <div className='dashboard-center-container'>
                <div className='dashboard-center-option'>
                    <div className='dashboard-center-option-header'>
                        RECEIVE A FORTUNE
                    </div>
                    <div className='dashboard-center-option-image' id="eye-look-img"/>

                </div>
                <div className='dashboard-center-option' onClick={() => navigateToCreateIfUnderLimit()}>
                    {
                        !limitReachedVisible &&
                        <>
                            <div className='dashboard-center-option-header' >
                                CREATE JOURNAL ENTRY
                            </div> 
                            <div className='dashboard-center-option-image' id="read-book-img"/>
                        </>
                    }
                    {
                        limitReachedVisible &&
                        <div className='dashboard-center-option-header'  >
                            MAXIMUM DAILY ENTRIES (3) REACHED
                        </div>
                    }

                </div>  
            </div>
        </div>

    )
}

export default DashboardPage;