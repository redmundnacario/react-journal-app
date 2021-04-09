import React, {Fragment, useContext} from 'react'
import {Modal} from 'react-bootstrap'

import Button from '../../shared/button/button.component'

import AlertContext from '../../../context/alert/alertContext'
import ModalContext from '../../../context/modal/modalContext'
import JournalContext from '../../../context/journal/journalContext'
import UserContext from '../../../context/user/userContext'

const JournalDelete = () => {

    const alertContext = useContext(AlertContext)
    const modalContext = useContext(ModalContext)
    const userContext = useContext(UserContext)
    const journalContext = useContext(JournalContext)

    const {hideModal} = modalContext
    const {token} = userContext
    const {journal_id, deleteJournal } = journalContext


    const setAlert = (message) => {
        if (message){
            alertContext.setAlert({title: message.status, message: message.message})
        }
    }

    const cbDeleteModal = () => {
        deleteJournal(journal_id, token, setAlert)
        hideModal()
    }

    const button_props_delete = {
        variant: "danger",
        text: "Delete",
        type: "submit",
        onClick: cbDeleteModal,
        isLoading: null,
    }
    
    const cbHideModal = () => hideModal()

    const button_props_cancel = {
        variant: "secondary",
        text: "Cancel",
        type: "button",
        onClick: cbHideModal ,
        isLoading: null,
    }

    return (
        <Fragment>
            <Modal.Header closeButton className="border-0">
            <Modal.Title>Delete Journal</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure you want to delete?
            </Modal.Body>

            <Modal.Footer className="border-0">
                <Button
                    {...button_props_cancel}
                />
                <Button
                    {...button_props_delete}
                />
            </Modal.Footer> 
        </Fragment>
    )
}

export default JournalDelete
