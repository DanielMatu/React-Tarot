import React, { useState, useEffect, useContext } from 'react'
import { DateContext } from '../../contexts/date-context'
import { EntryContext } from '../../contexts/entry-context'
import { FortuneContext } from '../../contexts/fortune-context'
import { randomizeNewCelticCross, fortuneIsFresh } from '../../decks/DeckHelpers'
import { history } from '../../routers/AppRouter'
import { Prompt } from 'react-router'
import TarotAlert from '../TarotAlert'
import LoadingPage from '../LoadingPage'



const JournalEntryPage = () => {

    // needs component to accept props
    // let {passedTitle, passedDate, passedBody, passedFortune} = props 

    window.onbeforeunload = function() {
        return 'sure?'
    }


    const { setDisplayCardName, setDisplayCardText, setDisplayCardPosition} = useContext(FortuneContext)

    const { entryState, setTitle, setDate, setBody, setFortune, setDeck, setUnmodifiedFortune, setUnmodifiedDeck, setDidSave, setSaveConfirmationVisible } = useContext(EntryContext)
    const { entryTitle, entryDate, entryBody, entryIndex, fortune, isEditing, deck, unmodifiedDeck, unmodifiedFortune, didSave } = entryState


    const { saveTodaysEntry, editGivenEntry} = useContext(DateContext)

    // const updateTitle = (e) => (e.target.value.lengh == 8) ? console.log('lmao') : setTitle(e.target.value)
    // const updateTitle = (e) => (e.target.value.length < 8) ? setTitle(e.target.value) : console.log('its less than 8')
    const updateTitle = (e) => (e.target.value.length < 10) ? setTitle(e.target.value) : setTitle(e.target.value.substring(0, e.target.value.length - 1))

    const updateBody = (e) => setBody(e.target.value);

    const [savingLoaderActive, setSavingLoaderActive] = useState(false)
    const [reqErrActive, setReqErrActive] = useState(false)
    const [fastNavToFortune, setFastNavToFortune] = useState(false)

    useEffect(() => {
        if (fastNavToFortune){
            if (Object.keys(fortune).length === 0) {
                // triggered by 'attach new fortune' case
                const [newRandomFortune, newDeck ] = randomizeNewCelticCross()
                    setFortune(newRandomFortune)
                    setUnmodifiedFortune(newRandomFortune)
                    setDeck(newDeck)
                    setUnmodifiedDeck(newDeck)
            } else {
                // triggered by 'view fortune' case
                if (didSave){
                    setFortune(fortune)
                    setDeck(deck)
                } else {
                    console.log('setting fortune to ')
                    console.log(unmodifiedFortune)
                    setFortune(unmodifiedFortune)
                    setDeck(unmodifiedDeck)

                }
            }
            setDisplayCardName('')
            setDisplayCardText('')
            setDisplayCardPosition([-1, -1, -1])
            history.push('/fortune')
        }
    }, [fastNavToFortune])

    const submitJournalEntry = (submitFunction, ...submitFunctionArgs) => {
        setDidSave(true)
        setUnmodifiedDeck(deck)
        setUnmodifiedFortune(fortune)
        submitFunctionArgs[6] = fortune 
        submitFunctionArgs[7] = deck
        if (!entryTitle) {
            setReqErrActive(true)
        } else {
            submitFunction(...submitFunctionArgs)
            setTitle("")
            setDate("")
            setBody("")
            setSavingLoaderActive(true)
            setSaveConfirmationVisible(true)

        }

    }

    // go to journal after submitted entry
    useEffect(() => {
        if (savingLoaderActive) {
            history.push('/journal')
        }
    }, [savingLoaderActive])
     

    return (
        <div className = 'create-entry-wrapper'>
            {
                savingLoaderActive && 
                <LoadingPage />

            }
          <Prompt
            when={!savingLoaderActive && !fastNavToFortune }
            message={
                location => `Yourr changes haven't been saved, are you sure you want to leave this page? also savingloaderactive: ${savingLoaderActive}`
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
                        <div className='entry-button save-button' onClick={() => submitJournalEntry(saveTodaysEntry, entryTitle, entryDate, entryBody, fortune, deck, unmodifiedFortune, unmodifiedDeck)}>
                            SAVE
                        </div>
                    }
                    {
                        isEditing && 
                        <div className='entry-button save-button' onClick={() => submitJournalEntry(editGivenEntry, entryTitle, entryDate, entryBody, entryIndex, fortune, deck, unmodifiedFortune, unmodifiedDeck)}>
                            SAVE EDITS
                        </div>
                    }

                </div>
            </div>
        </div>
    )

}

export default JournalEntryPage