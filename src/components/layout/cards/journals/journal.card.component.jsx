import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom';
import {Card} from 'react-bootstrap'

import './journal.card.styles.scss'

// import AlertContext from '../../../../context/alert/alertContext'
import JournalContext from '../../../../context/journal/journalContext'
import ModalContext from '../../../../context/modal/modalContext'
// import UserContext from '../../../../context/user/userContext'

const JournalCard = ({journal}) => {

    let history = useHistory();
    const{id, title, description} = journal
    
    // const alertContext = useContext(AlertContext)
    const journalContext = useContext(JournalContext)
    const modalContext = useContext(ModalContext)
    // const userContext = useContext(UserContext)

    // const {token} = userContext
    const {setJournalID } = journalContext
    const {showModal} = modalContext

    const handleEdit = (e) => {
        e.preventDefault()
        setJournalID(id)
        showModal({modalBody:"JournalFormsEdit"})
    }

    const handleDelete = (e) => {
        e.preventDefault()
        setJournalID(id)
        showModal({modalBody:"DeleteJournal"})
    }

    return (
            <Card  className = "journal-item mt-2">
            <Card.Body>
                <div id="journal-card-title">   
                    <div>
                        <h2>📎 {title}</h2>
                    </div>
                    <div>
                        <button 
                            onClick={(e) => handleEdit(e)}
                            className="btn p-1 ml-2">
                            <i className="fas fa-pencil-alt align-middle"></i>
                        </button>
                        <button 
                            onClick={(e) => handleDelete(e)}
                            className="btn p-1 ml-2">
                            <i className="fas fa-times fa-lg align-middle"></i>
                        </button>
                    </div>
                </div>
                <Card.Subtitle className="mb-2 text-muted" onClick={() => { history.push(`/journal/${id}/tasks`) }}>See tasks</Card.Subtitle>
                
                <div>
                    <div>
                        {description}...
                    </div>
                    {

                    // <div className="mb-0 mt-2" style={{display:"flex",justifyContent:"space-between"}}>
                    //     <span className="align-middle">
                    //     {
                    //         tags.map((tag, index) => (
                    //             <Badge key={index} className="mr-1" variant='warning'>#{tag}</Badge>
                    //         ))
                    //     }
                    //     </span>
                    //     <div>
                    //         {
                    //         likes >= 0 
                    //             ? <button 
                    //                 onClick={(e) => handleLikes(e)}
                    //                 className="btn p-0">
                    //                 <i className="far fa-star"></i> {likes}
                    //             </button> 
                    //             : ""
                    //         }
                    //         {
                    //         shares >= 0 
                    //             ? <button 
                    //                 onClick={(e) => handleShares(e)}
                    //                 className="btn p-0 ml-2">
                    //                 <i className="fas fa-code-branch"></i> {shares}
                    //             </button>
                    //             : ""
                    //         }
                    //     </div>
                    // </div>
                        }
                </div>
            </Card.Body>
        </Card>
    )
}

export default JournalCard
