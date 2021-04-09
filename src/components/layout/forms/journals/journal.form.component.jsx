import React, {useContext, useState} from 'react'
import {Form, Modal, Button as ButtonB} from 'react-bootstrap'

import Button from '../../shared/button/button.component'

import ModalContext from '../../../context/modal/modalContext'

const JournalForms = ({mode}) => {
    const modalContext = useContext(ModalContext)
    const {hideModal} = modalContext
    

    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)

    if (mode === "edit"){
        // get values from db

        // set the title and description
        setTitle("sample title")
        setDescription("sample Description")
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // do something here
        // if create, save to db

        // if edit, save to db

        hideModal()
    }

    const button_props_save = {
        variant: "primary",
        text: "Save",
        type: "submit",
        onclick: null,
        isLoading: null,
    }

    const button_props_cancel = {
        variant: "secondary",
        text: "Cancel",
        type: "submit",
        onclick: null,
        isLoading: null,
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e, {title, description})}>

            <Modal.Header closeButton className="border-0">
                <Modal.Title>Create Journal</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Title..."
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="textarea"
                        rows={3}
                        placeholder="Insert journal description here..."
                        onChange={(e) => setDescription(e.target.value)}
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
