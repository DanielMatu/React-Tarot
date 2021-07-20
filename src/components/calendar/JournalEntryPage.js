import React, { useState, useEffect, useContext } from 'react'
import { DateContext } from '../../contexts/date-context'
import { EntryContext } from '../../contexts/entry-context'
import { FortuneContext } from '../../contexts/fortune-context'
import { randomizeNewCelticCross } from '../../decks/DeckHelpers'
import { getMonthAndNumDays } from '../../actions/calendarUpdatingFuncs'
import { firebase } from '../../firebase/firebase'
import { history } from '../../routers/AppRouter'
import { Prompt } from 'react-router'
import TarotAlert from '../TarotAlert'



const JournalEntryPage = () => {

    // needs component to accept props
    // let {passedTitle, passedDate, passedBody, passedFortune} = props 

    window.onbeforeunload = function() {
        return 'sure?'
    }


    const {fortuneState, setLayout, setDisplayCardName, setDisplayCardText, setHoverCardHeld, setDeck, setDisplayCardPosition} = useContext(FortuneContext)
    const {deck, layout, displayCardName, displayCardText, hoverCardHeld} = fortuneState

    const [ entryState, setTitle, setDate, setBody, setEntryIndex, setFortune, setIsEditing ] = useContext(EntryContext)
    const [ title, date, body, index, fortune, isEditing ] = entryState


    const [state, monthInc, monthDec, yearInc, yearDec, removeEntry, saveTodaysEntry, editGivenEntry] = useContext(DateContext)
    let [ numericalMonth, year, calendar ] = state

    // const updateTitle = (e) => (e.target.value.lengh == 8) ? console.log('lmao') : setTitle(e.target.value)
    // const updateTitle = (e) => (e.target.value.length < 8) ? setTitle(e.target.value) : console.log('its less than 8')
    const updateTitle = (e) => (e.target.value.length < 10) ? setTitle(e.target.value) : setTitle(e.target.value.substring(0, e.target.value.length - 1))

    const updateBody = (e) => setBody(e.target.value);

    const [alertActive, setAlertActive] = useState(false) 
    const [reqErrActive, setReqErrActive] = useState(false)
    const [fastNavToFortune, setFastNavToFortune] = useState(false)

    useEffect(() => {
        if (fastNavToFortune){
            if (Object.keys(fortune).length === 0) {
                // triggered by 'attach new fortune' case
                const [newRandomLayout, newDeck ] = randomizeNewCelticCross()
                setLayout(newRandomLayout)
                setDeck(newDeck)
            } else {
                // triggered by 'view fortune' case 
                setLayout(fortune)
            }
            setDisplayCardName('')
            setDisplayCardText('')
            setDisplayCardPosition([-1, -1, -1])
            history.push('/fortune')
        }
    }, [fastNavToFortune])

    const submitJournalEntry = (submitFunction, ...submitFunctionArgs) => {
        if (!title) {
            setReqErrActive(true)
        } else {
            submitFunction(...submitFunctionArgs)
            setTitle("")
            setDate("")
            setBody("")
            setFortune({})
            setAlertActive(true)
        }
    }

    return (
        <div className = 'create-entry-wrapper'>
            {
                alertActive && 
                <TarotAlert alertText={"Journal entry saved successfully!"} goBackHandler={() => history.push('/Journal')}/>

            }
          <Prompt
            when={!alertActive && !fastNavToFortune }
            message={
                location => `Your changes haven't been saved, are you sure you want to leave this page?`
             }
          />
            <div className='create-entry-container' >
                <div className='half-entry text-entry'>
                    <textarea className='entry-text-area entry-title' placeholder="Enter a title:" value={title} onChange={updateTitle} required></textarea>
                    {
                        reqErrActive &&
                        <div className='error-message'>Please enter a title</div>
                    }
                    <textarea className='entry-text-area entry-date' value={date} readOnly></textarea>


                    <textarea className='entry-text-area text-area-body' value={body} onChange={updateBody} >

                    </textarea>
                </div>
                <div className='book-spine'></div>
                <div className='half-entry bottom-entry'>
                    {
                        (Object.keys(fortune).length > 0) && 
                        <div className='entry-button view-fortune-button' onClick={() => setFastNavToFortune(true)}>
                            VIEW FORTUNE
                        </div>
                    }
                    {
                        (Object.keys(fortune).length === 0) && 
                        <div className='entry-button view-fortune-button' onClick={() => setFastNavToFortune(true)}>
                            ATTACH NEW FORTUNE
                        </div>
                    }
                    {
                        !isEditing && 
                        <div className='entry-button save-button' onClick={() => submitJournalEntry(saveTodaysEntry, title, date, body, calendar, fortune)}>
                            SAVE
                        </div>
                    }
                    {
                        isEditing && 
                        <div className='entry-button save-button' onClick={() => submitJournalEntry(editGivenEntry, title, date, body, index, calendar, fortune)}>
                            SAVE EDITS
                        </div>
                    }

                </div>
            </div>
        </div>
    )

}

export default JournalEntryPage