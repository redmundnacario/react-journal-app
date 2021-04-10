import React, {useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import JournalContext from '../../../context/journal/journalContext'
import TaskContext from '../../../context/task/taskContext'
import UserContext from '../../../context/user/userContext'
import ModalContext from '../../../context/modal/modalContext'

import TasksList from './tasks.list.component'
import Button from '../../shared/button/button.component'

import './tasks.page.styles.scss'

const TasksPage = () => {

    const {id} = useParams()

    const journalContext = useContext(JournalContext)
    const taskContext = useContext(TaskContext)
    const userContext = useContext(UserContext)
    const modalContext = useContext(ModalContext)

    const { journal, getJournal, setJournalID } = journalContext
    const { tasks, 
            tasks_today, 
            getTasksByJournalID,
            getTasksTodayByJournalID } = taskContext

    const {token} = userContext
    const {showModal} = modalContext
    
    console.log(id)

    useEffect(()=>{
        setJournalID(id)
        getJournal(id, token)
        getTasksByJournalID(id, token)
        getTasksTodayByJournalID(id, token)
        // eslint-disable-next-line 
    },[])

    const handleClick = () => {
        showModal({modalBody:"TaskForms"})
    }

    const button_props = {
        variant: "primary",
        size : null,
        text: (<>Add Task <i className="fas fa-plus pl-2"></i></>),
        type: "submit",
        isLoading: null,
        onClick : handleClick
    }
    
    return (
        
        <div className="container">
            <div className="task-page-title my-5">
                <h1 >🚀 {journal.title}</h1>
                <Button {...button_props}/>
            </div>
            {
                tasks_today.length > 0
                ? <TasksList tasks={tasks_today} title={"Due Today!"} />
                : ""
            }
            {
                tasks.length > 0
                ? <TasksList tasks={tasks} title={"All Tasks"} />
                : 
                (<div className="mt-5">
                    <h2>All Tasks</h2>
                    <h4>No Tasks yet. You can create one!</h4>
                </div>)
            }
            
        </div>
        
    )
}

export default TasksPage
