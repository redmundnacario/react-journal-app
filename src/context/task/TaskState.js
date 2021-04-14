import {useReducer} from 'react'

import TaskContext from './taskContext'
import TaskReducer from './taskReducer'

import {
    SET_TASKS,
    SET_TASKS_TODAY,
    SET_TASK,
    SET_LOADING,
    SET_MESSAGE,
    SET_ACTIVE_TASK_ID
} from '../types'

import url from '../url';

const TaskState = (props) => {
    const initialState = {
        tasks : [],
        task : {},
        tasks_today: [],
        task_id: null,
        isLoading : false,
        message : {}
    }

    
    const [state, dispatch] = useReducer(TaskReducer, initialState)


    // fetch
    const getTasks = async(token) =>{
        setIsLoading()

        const res = await fetch(`${url}/tasks`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })

        const result = await res.json()

        if (res.status === 200){
            console.log('Tasks fetched.')
            dispatch({
                type: SET_TASKS,
                payload: result.data
            })
        }

        const out = {
            status: "Error",
            message: "Something wrong with fetching the tasks. Try again."
        }
       
        dispatch({
            type: SET_MESSAGE,
            payload: out
        })
    }


    const getTasksByJournalID = async(journal_id, token) =>{
        setIsLoading()

        const res = await fetch(`${url}/tasks/journal/${journal_id}`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })

        const result = await res.json()
        // const {status, message} = result
        
        console.log(result)
        if (res.status === 200){
            console.log('Tasks fetched.')
            dispatch({
                type: SET_TASKS,
                payload: result.data
            })
        } else {
            const out = {
                status: "Error",
                message: "Something wrong with fetching the tasks. Try again."
            }
           
            dispatch({
                type: SET_MESSAGE,
                payload: out
            })
        }
    }


    const getTasksToday = async(token) =>{
        setIsLoading()

        const res = await fetch(`${url}/today/tasks`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })

        const result = await res.json()
        // const {status, message} = result

        if (res.status === 200){
            console.log('Tasks fetched.')
            dispatch({
                type: SET_TASKS_TODAY,
                payload: result.data
            })
        } else {
            const out = {
                status: "Error",
                message: "Something wrong with fetching the tasks. Try again."
            }
           
            dispatch({
                type: SET_MESSAGE,
                payload: out
            })
        }
    }

    const getTasksTodayByJournalID = async(journal_id, token) =>{
        setIsLoading()

        const res = await fetch(`${url}/today/tasks/journal/${journal_id}`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })

        const result = await res.json()
        // const {status, message} = result

        if (res.status === 200){
            console.log('Tasks fetched.')
            dispatch({
                type: SET_TASKS_TODAY,
                payload: result.data
            })
        } else {
            const out = {
                status: "Error",
                message: "Something wrong with fetching the tasks. Try again."
            }
           
            dispatch({
                type: SET_MESSAGE,
                payload: out
            })
        }
    }


    const getTask = async(id, token)=>{
        setIsLoading()

        const res = await fetch(`${url}/tasks/${id}`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })

        const result = await res.json()

        if (res.status === 200){
            console.log('Task fetched.')
            dispatch({
                type: SET_TASK,
                payload: result.data
            })
        }

        const {status, message} = result
        dispatch({
            type: SET_MESSAGE,
            payload: {status, message}
        })

    }


    // Create
    const createTask = async(data, token, cb) => {
        setIsLoading()

        const res = await fetch(`${url}/tasks`,
                      {
                        method: 'POST',
                        headers: {
                          'Content-type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data),
                      })
        
        // const savedData = await res.json()
    
        // fetch success or not
        if (res.status === 201){
            console.log('Task created.')
            getTasksByJournalID(data.journal_id, token)
            getTasksTodayByJournalID(data.journal_id, token)
        } 

        const result = await res.json()

        // For error message
        const {status, message} = result
        dispatch({
            type: SET_MESSAGE,
            payload: {status, message}
        })

        cb({status, message})
    }


    // Edit
    const updateTask = async(data, id, token, cb) => {
        setIsLoading()
        const res = await fetch(`${url}/tasks/${id}`, 
                      {
                        method: 'PUT',
                        headers: {
                          'Content-type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data),
                      })

        console.log(`${url}/tasks/${id}`)
        console.log(res.data)

        if (res.status === 200){
            console.log('Task updated.')
            getTasksByJournalID(data.journal_id, token)
            getTasksTodayByJournalID(data.journal_id, token)
        }

        const result = await res.json()

        // For error message
        const {status, message} = result
        dispatch({
            type: SET_MESSAGE,
            payload: {status, message}
        })

        cb({status, message})
    }


    // Delete
    const deleteTask = async(id, journal_id, token, cb) => {
        setIsLoading()

        const res = await fetch(`${url}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    
        if (res.status === 200 ){
            console.log('Task deleted.')
            console.log()
            getTasksByJournalID(journal_id, token)
            getTasksTodayByJournalID(journal_id, token)
        } else{
            console.log('Error in deleting this blog.')
        }
        const result = await res.json()
        // For error message
        const {status, message} = result

        cb({status, message})
    }

    const setTaskID = (id)=>{
        dispatch({
            type: SET_ACTIVE_TASK_ID,
            payload: id
        })
    }


    // set loading to true
    const setIsLoading = () => {
        dispatch({ type: SET_LOADING });
    };


    const clearMessage = () => {
        dispatch({type: SET_MESSAGE, payload: null})
    }

    // Delete
    return (
        <TaskContext.Provider
        value={{
            tasks : state.tasks,
            task : state.task,
            tasks_today: state.tasks_today,
            task_id : state.task_id,
            isLoading : state.isLoading,
            message: state.message,
            getTasks,
            getTasksToday,
            getTasksByJournalID,
            getTasksTodayByJournalID,
            getTask,
            setTaskID,
            createTask,
            updateTask,
            deleteTask,
            setIsLoading,
            clearMessage
        }}
        >
        {props.children}
        </TaskContext.Provider>)
}

export default TaskState