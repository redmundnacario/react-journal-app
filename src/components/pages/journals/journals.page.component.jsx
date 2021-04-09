import React,{ useEffect, useContext} from 'react'
// import {Form, Modal,Button  as ButtonB} from 'react-bootstrap'

// Context
import JournalContext from '../../../context/journal/journalContext'
import UserContext from '../../../context/user/userContext'
import ModalContext from '../../../context/modal/modalContext'

import JournalsList from './journals.list.component'
import Button from '../../shared/button/button.component'

import './journals.page.styles.scss'

const JournalsPage = () => {
    const journalContext = useContext(JournalContext)
    const userContext = useContext(UserContext)
    const modalContext = useContext(ModalContext)

    const { journals, getJournals } = journalContext
    const {token} = userContext
    const {showModal} = modalContext


    useEffect(()=>{
        getJournals(token)
        // eslint-disable-next-line 
    },[])


    const handleClick = () => {
        showModal({modalBody:"JournalForms"})
    }

    const button_props = {
        variant: "primary",
        size : null,
        text: (<>Create <i className="fas fa-plus pl-2"></i></>),
        type: "submit",
        isLoading: null,
        onClick : handleClick
    }

    return (
        <div className="container">
            <div className="journal-page-title my-5">
                <h1 >🚀  Journals</h1>
                <Button {...button_props}/>
            </div>
            {
                journals.length > 0
                ? <JournalsList journals={journals}/>
                : <h2>No Journals yet. You can create one!</h2>
            }
            
        </div>
    )
}

export default JournalsPage
