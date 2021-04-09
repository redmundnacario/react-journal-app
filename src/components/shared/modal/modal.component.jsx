import React, {useState , useContext} from 'react'
import {Modal as ModalB, Button as ButtonB, Form} from 'react-bootstrap'

// import UserContext from '../../../context/user/userContext'
import ModalContext from '../../../context/modal/modalContext'

const Modal = () => {

    const modalContext = useContext(ModalContext)
    const {show, modalBody, showModal, hideModal} = modalContext

    return (
        <ModalB show={show} onHide={hideModal}>
            <ModalB.Header closeButton className="border-0">
            <ModalB.Title>Modal heading</ModalB.Title>
            </ModalB.Header>

            <ModalB.Body>
                {modalBody}
            </ModalB.Body>

            <ModalB.Footer className="border-0">
            <ButtonB variant="secondary" onClick={hideModal}>
                Close
            </ButtonB>
            <ButtonB variant="primary" onClick={hideModal}>
                Save Changes
            </ButtonB>
            </ModalB.Footer>
        </ModalB>
    )
}

export default Modal

// <Form onSubmit={null}>

//             <Form.Group controlId="email">
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control 
//                     type="email"
//                     onChange={null}
//                     required
//                 />
//             </Form.Group>
        
//             <Form.Group controlId="password">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                     type="password"
//                     onChange={null}
//                     minLength="6"
//                     required
//                 />
//             </Form.Group>
//         </Form>