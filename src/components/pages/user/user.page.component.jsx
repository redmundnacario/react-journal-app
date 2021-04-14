import React, {useState} from 'react'
import {Card} from 'react-bootstrap'

import Button from '../../shared/button/button.component'
import SignUpForm from '../../pages/signup/signup.form.component'

const UserPage = (props) => {
    const {setMode, open, setOpen} = props

    const handleClickEdit = (e) =>{
        console.log("hello")
        e.preventDefault()
        setOpen(!open)
        if (open) {
            setMode("edit")
        } else{
            setMode("show")
        }
    }

    const button_props ={
        variant: "primary",
        text: "Edit",
        type: "button",
        onClick: handleClickEdit
    }

    props.button_props_cancel.onClick = handleClickEdit

    return (
        <div className="container">
            <Card>
                <Card.Body>
                <Card.Title>User Information</Card.Title>
                
                <SignUpForm {...props}/>
                
                {
                    open &&
                    <Button 
                        {...button_props}
                    />
                }
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserPage
