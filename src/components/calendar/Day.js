import React from 'react';


// day : { journalEntryPreviews [...] }
// journalEntryPreviews = {name : 'journal1'}
const Day = ( props ) => {
    const {dayNumber, entryPreviews} = props
    // console.log('heres props')
    // console.log(props)
    return (
        <div className='day-container'>
            {dayNumber}
            {
                entryPreviews.map((entry, index) => (
                    <p key={index}>here's an entry</p>
                ))
            }
        </div>
    )


}

export default Day;