import React,{ useEffect, useContext} from 'react'
// import {Form, Modal,Button  as ButtonB} from 'react-bootstrap'

// Context
import JournalContext from '../../context/journal/journalContext'
import UserContext from '../../context/user/userContext'
import ModalContext from '../../context/modal/modalContext'

import JournalsPage from '../../components/pages/journals/journals.page.component'


const JournalsContainer = () => {
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
        <JournalsPage 
            journals={journals}
            button_props={button_props}
        />
    )
}

export default JournalsContainer
