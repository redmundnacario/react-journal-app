import React,{useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'

import AlertContext from '../../context/alert/alertContext'
import UserContext from '../../context/user/userContext'

import UserPage from '../../components/pages/user/user.page.component'

const UserContainer = () => {
    // history
    const history = useHistory();
    // contexts
    const userContext = useContext(UserContext)
    const alertContext = useContext(AlertContext)

    const {user, token, isLoading, updateUserAccount} = userContext
    // local components
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    useEffect(()=>{
        setEmail(user.email)
        setUsername(user.username)
        // eslint-disable-next-line
    }, [])

    const reRoute = () => history.push("/")

    const setAlertUpdateUserAccount = (message, statusCode) => {
        if (message){
            alertContext.setAlert({title: message.status, message: message.message})
        }
    }

    const handleSubmit = (e, data) =>{
        e.preventDefault()

        console.log(data)

        // update user info
        updateUserAccount(data,token, setAlertUpdateUserAccount)
    }

    const handleCancel = ()

    const propsSent = {
        email,
        setEmail,
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        handleSubmit,
        button_props,
        button_props_cancel

    }
    return (
        <UserPage 
            {...propsSent}
        />
    )
}

export default UserContainer
