import React, { useContext} from 'react'
import {Modal as ModalB} from 'react-bootstrap'

// import UserContext from '../../../context/user/userContext'
import ModalContext from '../../../context/modal/modalContext'

//
import JournalForms from '../../layout/forms/journals/journal.form.component'
import JournalDelete from '../../layout/modalContent/journal.delete.component'
const Modal = () => {

    const modalContext = useContext(ModalContext)
    const {show, modalBody, hideModal} = modalContext

    return (
        <ModalB show={show} onHide={hideModal} centered>
            {
                modalBody === "JournalForms" && <JournalForms/>
            }
            {
                modalBody === "JournalFormsEdit" && <JournalForms/>
            }
            {
                modalBody === "DeleteJournal" && <JournalDelete/>
            }
        </ModalB>
    )
}

export default Modal