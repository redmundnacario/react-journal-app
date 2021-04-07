import {useReducer} from 'react'

import TaskContext from './taskContext'
import TaskReducer from './taskReducer'

import {
    SET_TASKS,
    SET_TASK,
    SET_LOADING,
    SET_MESSAGE,
    CLEAR_MESSAGE,
} from '../types'

import url from '../url';

const TaskState = (props) => {
    const initialState = {
        tasks : [],
        task : {},
        isLoading : false,
        message : {}
    }

    
    const [state, dispatch] = useReducer(TaskReducer, initialState)


    // fetch
    const getTasks = async({token}) =>{
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


    const getTask = async({id, token})=>{
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
    const createTask = async({data, token}) => {
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
            getTasks(token)
        } 

        const result = await res.json()

        // For error message
        const {status, message} = result
        dispatch({
            type: SET_MESSAGE,
            payload: {status, message}
        })
    }


    // Edit
    const updateTask = async({data, id, token}) => {
        setIsLoading()
        const res = await fetch(`${url}/tasks/${id}`, 
                      {
                        method: 'PATCH',
                        headers: {
                          'Content-type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data),
                      })
    
        // const data = await res.json()

        if (res.status === 200){
            console.log('Task updated.')
            getTasks(token)
        }
        
        const result = await res.json()

        // For error message
        const {status, message} = result
        dispatch({
            type: SET_MESSAGE,
            payload: {status, message}
        })
    }


    // Delete
    const deleteTask = async({id, token}) => {
        setIsLoading()

        const res = await fetch(`${url}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    
        if (res.status === 200 ){
            console.log('Task deleted.')
            getTasks(token)
        } else{
            alert('Error in deleting this blog.')
        }
    }


    // set loading to true
    const setIsLoading = () => {
        dispatch({ type: SET_LOADING });
    };


    const clearMessage = () => {
        dispatch({type: CLEAR_MESSAGE})
    }

    // Delete
    return (
        <TaskContext.Provider
        value={{
            tasks : state.tasks,
            task : state.task,
            isLoading : state.isLoading,
            message: state.message,
            getTasks,
            getTask,
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