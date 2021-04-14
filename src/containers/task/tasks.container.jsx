import React, {useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import JournalContext from '../../context/journal/journalContext'
import TaskContext from '../../context/task/taskContext'
import UserContext from '../../context/user/userContext'
import ModalContext from '../../context/modal/modalContext'

import TasksPage from '../../components/pages/tasks/tasks.page.component'

const TasksContainer = () => {

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
        <TasksPage
            journal ={journal}
            button_props = {button_props}
            tasks_today = {tasks_today}
            tasks = {tasks}
        />
    )
}

export default TasksContainer
