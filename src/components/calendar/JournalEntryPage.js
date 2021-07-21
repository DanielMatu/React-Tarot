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


    const {fortuneState, setDisplayCardName, setDisplayCardText, setDisplayCardPosition} = useContext(FortuneContext)
    const {displayCardName, displayCardText} = fortuneState

    const { entryState, setTitle, setDate, setBody, setEntryIndex, setFortune, setIsEditing, setDeck } = useContext(EntryContext)
    const { entryTitle, entryDate, entryBody, entryIndex, fortune, isEditing, deck } = entryState


    const {dateState, saveTodaysEntry, editGivenEntry} = useContext(DateContext)
    let { calendar } = dateState

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
                const [newRandomFortune, newDeck ] = randomizeNewCelticCross()
                setFortune(newRandomFortune)
                setDeck(newDeck)
            } else {
                // triggered by 'view fortune' case 
                setFortune(fortune)
            }
            setDisplayCardName('')
            setDisplayCardText('')
            setDisplayCardPosition([-1, -1, -1])
            history.push('/fortune')
        }
    }, [fastNavToFortune])

    const submitJournalEntry = (submitFunction, ...submitFunctionArgs) => {
        if (!entryTitle) {
            setReqErrActive(true)
        } else {
            submitFunction(...submitFunctionArgs)
            setTitle("")
            setDate("")
            setBody("")
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
                    <textarea className='entry-text-area entry-title' placeholder="Enter a title:" value={entryTitle} onChange={updateTitle} required></textarea>
                    {
                        reqErrActive &&
                        <div className='error-message'>Please enter a title</div>
                    }
                    <textarea className='entry-text-area entry-date' value={entryDate} readOnly></textarea>


                    <textarea className='entry-text-area text-area-body' value={entryBody} onChange={updateBody} >

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
                        <div className='entry-button save-button' onClick={() => submitJournalEntry(saveTodaysEntry, entryTitle, entryDate, entryBody, calendar, fortune)}>
                            SAVE
                        </div>
                    }
                    {
                        isEditing && 
                        <div className='entry-button save-button' onClick={() => submitJournalEntry(editGivenEntry, entryTitle, entryDate, entryBody, entryIndex, calendar, fortune)}>
                            SAVE EDITS
                        </div>
                    }

                </div>
            </div>
        </div>
    )

}

export default JournalEntryPage