import React,{ useEffect, useContext} from 'react'
import {Form, Modal,Button  as ButtonB} from 'react-bootstrap'

// Context
import JournalContext from '../../../context/journal/journalContext'
import UserContext from '../../../context/user/userContext'
import ModalContext from '../../../context/modal/modalContext'

import JournalsList from './journals.list.component'
import Button from '../../shared/button/button.component'


const JournalsPage = () => {
    const journalContext = useContext(JournalContext)
    const userContext = useContext(UserContext)
    const modalContext = useContext(ModalContext)

    const { journals, getJournals } = journalContext
    const {token} = userContext
    const {showModal, hideModal} = modalContext


    useEffect(()=>{
        getJournals(token)
    },[])


    const handleClick = () => {
        showModal({modalBody:sampleForm})
    }

    const button_props = {
        variant: "primary",
        text: "Create New",
        type: "submit",
        isLoading: null,
        onClick : handleClick
    }

    return (
        <div className="container">
            <div className="home-title">
                <h3 className="">📎 Journals</h3>
                <Button {...button_props}/>
            </div>
            <h1>Journals Page</h1>
            {
                journals.length > 0
                ? <JournalsList journals={journals}/>
                : <h2>No Journals yet. You can create one!</h2>
            }
            
        </div>
    )
}

const sampleForm = (

    <Form onSubmit={null}>

        <Modal.Header closeButton className="border-0">
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
                <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type="email"
                    onChange={null}
                    required
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    onChange={null}
                    minLength="6"
                    required
                />
            </Form.Group>
        </Modal.Body>

        <Modal.Footer className="border-0">
        <ButtonB variant="secondary" onClick={null}>
            Close
        </ButtonB>
        <ButtonB variant="primary" onClick={null}>
            Save Changes
        </ButtonB>
        </Modal.Footer>
    </Form>
)

export default JournalsPage
