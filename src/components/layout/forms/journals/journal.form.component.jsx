import React, {useContext, useState, useEffect} from 'react'
import {Form, Modal} from 'react-bootstrap'

import Button from '../../../shared/button/button.component'
// contexts
import AlertContext from '../../../../context/alert/alertContext'
import ModalContext from '../../../../context/modal/modalContext'
import JournalContext from '../../../../context/journal/journalContext'
import UserContext from '../../../../context/user/userContext'

const JournalForms = () => {
    const alertContext = useContext(AlertContext)
    const modalContext = useContext(ModalContext)
    const userContext = useContext(UserContext)
    const journalContext = useContext(JournalContext)

    const {modalBody, hideModal} = modalContext
    const {token} = userContext
    const { journal, journal_id, getJournal, createJournal, updateJournal } = journalContext
    
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)

    useEffect(()=>{
        console.log(journal_id)
        if ((journal_id) && (modalBody === "JournalFormsEdit")){
            // get values from db
            getJournal(journal_id,token)
            // set the title and description
        }
    }, [journal_id])

    useEffect(() => {
        if (journal && modalBody === "JournalFormsEdit"){
            setTitle(journal.title)
            setDescription(journal.description)
        }
        // eslint-disable-next-line 
    }, [journal])

    const handleSubmit = (e, data) => {
        e.preventDefault()

        console.log(data)
        if (modalBody === "JournalFormsEdit"){
            console.log("edit/update journal")
            updateJournal(data, journal_id, token, setAlert)
        } else {
            console.log("create journal")
            createJournal(data, token, setAlert)
        }

        hideModal()
    }

    const setAlert = (message) => {
        if (message){
            alertContext.setAlert({title: message.status, message: message.message})
        }
    }

    const button_props_save = {
        variant: "primary",
        text: "Save",
        type: "submit",
        onClick: null,
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
        <Form 
            onSubmit={(e) => handleSubmit(e, {title, description})}
            className="p-2"    
        >

            <Modal.Header closeButton className="border-0">
                {
                    modalBody === "JournalFormsEdit"
                    ? <Modal.Title>Update Journal</Modal.Title>
                    : <Modal.Title>Create Journal</Modal.Title>
                }
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Title..."
                        onChange={(e) => setTitle(e.target.value)}
                        value={title ? title : ""}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="textarea"
                        minLength={10}
                        rows={5}
                        placeholder="Insert journal description here..."
                        onChange={(e) => setDescription(e.target.value)}
                        value={description ? description : ""}
                        required
                    />
                </Form.Group>
            </Modal.Body>

            <Modal.Footer className="border-0">
                <Button
                    {...button_props_cancel}
                />
                <Button
                    {...button_props_save}
                />
            </Modal.Footer>
        </Form>
    )
}

export default JournalForms
