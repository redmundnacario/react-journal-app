import React, {useContext, useState, useEffect} from 'react'
import {Form, Modal} from 'react-bootstrap'

import Button from '../../../shared/button/button.component'
// contexts
import JournalContext from '../../../../context/journal/journalContext'
import AlertContext from '../../../../context/alert/alertContext'
import ModalContext from '../../../../context/modal/modalContext'
import TaskContext from '../../../../context/task/taskContext'
import UserContext from '../../../../context/user/userContext'

const TaskForms = () => {
    const journalContext = useContext(JournalContext)
    const alertContext = useContext(AlertContext)
    const modalContext = useContext(ModalContext)
    const userContext = useContext(UserContext)
    const taskContext = useContext(TaskContext)

    const { journal_id } = journalContext
    const { modalBody, hideModal} = modalContext
    const { token} = userContext
    const { task, task_id, getTask, createTask, updateTask } = taskContext
    
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [deadline, setDeadline] = useState(null)
    const [done, setDone] = useState(null)

    useEffect(()=>{
        if ((task_id) && (modalBody === "TaskFormsEdit")){
            // get values from db
            getTask(task_id,token)
            // set the title and description
        }
    }, [task_id])

    useEffect(() => {
        if (task && modalBody === "TaskFormsEdit"){
            setTitle(task.title)
            setDescription(task.description)
            setDeadline(task.deadline)
            setDone(task.done)
        }
        // eslint-disable-next-line 
    }, [task])

    const handleSubmit = (e, data) => {
        e.preventDefault()

        if (data.done ==="on"){
            data.done = true
        } else {
            data.done = false
        }
        data.journal_id = journal_id

        console.log(data)


        console.log(data)
        if (modalBody === "TaskFormsEdit"){
            console.log("edit/update task")
            updateTask(data, task_id, token, setAlert)
        } else {
            console.log("create task")
            createTask(data, token, setAlert)
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
            onSubmit={(e) => handleSubmit(e, {title, description, deadline, done})}
            className="p-2"    
        >

            <Modal.Header closeButton className="border-0">
                {
                    modalBody === "TaskFormsEdit"
                    ? <Modal.Title>Update Task</Modal.Title>
                    : <Modal.Title>Create Task</Modal.Title>
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
                        as="textarea"
                        minLength={10}
                        rows={5}
                        placeholder="Insert task description here..."
                        onChange={(e) => setDescription(e.target.value)}
                        value={description ? description : ""}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="deadline">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control 
                        type="date" 
                        name='deadline' 
                        onChange = {(e) => setDeadline(e.target.value)}
                        value ={deadline}
                    />
                </Form.Group>
    
                <Form.Group controlId="done">
                    <Form.Label>Status</Form.Label>
                    <Form.Check 
                        type="checkbox" 
                        label="Done?" 
                        onChange ={(e) => setDone(e.target.value)}
                        defaultChecked={ done}
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

export default TaskForms
