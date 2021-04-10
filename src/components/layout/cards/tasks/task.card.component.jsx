import React, {useContext} from 'react'
import {Card, Badge} from 'react-bootstrap'

import './task.card.styles.scss'

// import AlertContext from '../../../../context/alert/alertContext'
import TaskContext from '../../../../context/journal/journalContext'
import ModalContext from '../../../../context/modal/modalContext'
// import UserContext from '../../../../context/user/userContext'

const TaskCard = ({task}) => {

    const{id, title, description, deadline, done} = task
    
    // const alertContext = useContext(AlertContext)
    const taskContext = useContext(TaskContext)
    const modalContext = useContext(ModalContext)
    // const userContext = useContext(UserContext)

    // const {token} = userContext
    const {setTaskID } = taskContext
    const {showModal} = modalContext

    const handleEdit = (e) => {
        e.preventDefault()
        setTaskID(id)
        showModal({modalBody:"TaskFormsEdit"})
    }

    const handleDelete = (e) => {
        e.preventDefault()
        setTaskID(id)
        showModal({modalBody:"DeleteTask"})
    }

    const DateToFormattedString = (d) => {         
                                 
        var yyyy = d.getFullYear().toString();                                    
        var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based         
        var dd  = d.getDate().toString();             
                             
        return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
   };  

    return (
            <Card  className = "journal-item mt-2">
            <Card.Body>
                <div id="journal-card-title">   
                    <div>
                        <h2>🎯 {title}</h2>
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

                <Card.Subtitle className="mb-2 text-muted" >Due on {deadline}</Card.Subtitle>
                
                <div>
                    <div>
                        {description}...
                    </div>
                    {

                    <div className="mb-0 mt-2" style={{display:"flex",justifyContent:"space-between"}}>
                        <span className="align-middle">
                        {
                            deadline === DateToFormattedString(new Date())
                            && <Badge className="mr-1 p-2" variant='warning'>#Due today!</Badge>
                        }
                        {
                            done && <Badge className="mr-1 p-2" variant='success'>#Done</Badge>
                        }
                        </span>
                    </div>
                        }
                </div>
            </Card.Body>
        </Card>
    )
}

export default TaskCard
