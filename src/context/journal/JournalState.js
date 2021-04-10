import {useReducer} from 'react'

import JournalContext from './journalContext'
import JournalReducer from './journalReducer'

import {
    SET_JOURNALS,
    SET_JOURNAL,
    SET_LOADING,
    SET_MESSAGE,
    SET_ACTIVE_JOURNAL_ID
} from '../types'

import url from '../url';

const JournalState = (props) => {
    const initialState = {
        journals : [],
        journal : {},
        journal_id: [],
        isLoading : false,
        message : {}
    }

    
    const [state, dispatch] = useReducer(JournalReducer, initialState)


    // fetch
    const getJournals = async(token) =>{
        setIsLoading()
        // console.log(token)
        const res = await fetch(`${url}/journals`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })

        const result = await res.json()

        if (res.status === 200){
            console.log('Journals fetched.')
            dispatch({
                type: SET_JOURNALS,
                payload: result.data
            })
        }

        const out = {
            status: "Error",
            message: "Something wrong with fetching the journals. Try again."
        }
       
        dispatch({
            type: SET_MESSAGE,
            payload: out
        })
        // console.log(result)
    }


    const getJournal = async(id, token)=>{
        setIsLoading()
        console.log(id)
        const res = await fetch(`${url}/journals/${id}`,
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })

        const result = await res.json()

        if (res.status === 200){
            console.log('Journal fetched.')
            dispatch({
                type: SET_JOURNAL,
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
    const createJournal = async(data, token , cb) => {
        setIsLoading()

        const res = await fetch(`${url}/journals`,
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
            console.log('Journal created.')
            getJournals(token)
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
    const updateJournal = async(data, id, token, cb) => {
        setIsLoading()
        const res = await fetch(`${url}/journals/${id}`, 
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
            console.log('Journal updated.')
            getJournals(token)
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
    const deleteJournal = async(id, token, cb) => {
        setIsLoading()

        const res = await fetch(`${url}/journals/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    
        if (res.status === 200 ){
            console.log('Journal deleted.')
            getJournals(token)
        } else{
            console.log('Error in deleting this blog.')
        }

        const result = await res.json()
        // For error message
        const {status, message} = result

        cb({status, message})
    }

    const setJournalID = (id)=>{
        dispatch({
            type: SET_ACTIVE_JOURNAL_ID,
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
        <JournalContext.Provider
        value={{
            journals : state.journals,
            journal : state.journal,
            journal_id: state.journal_id,
            isLoading : state.isLoading,
            message: state.message,
            getJournals,
            getJournal,
            setJournalID,
            createJournal,
            updateJournal,
            deleteJournal,
            setIsLoading,
            clearMessage
        }}
        >
        {props.children}
        </JournalContext.Provider>)
}

export default JournalState