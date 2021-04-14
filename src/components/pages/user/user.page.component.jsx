import React, {useState} from 'react'
import {Card} from 'react-bootstrap'

import Button from '../../shared/button/button.component'



const UserPage = (props) => {
    const { 
            user
        } = props
    
    const [open, setOpen] = useState("true")

    const handleClickEdit = (e) =>{
        console.log("hello")
        e.preventDefault()
        setOpen(!open)
    }

    const button_props ={
        variant: "primary",
        text: "Edit",
        type: "button",
        onClick: handleClickEdit
    }
    return (
        <div className="container">
            <Card>
                <Card.Body>
                <Card.Title>User Information</Card.Title>
                <Card.Text>
                    {user.username}
                </Card.Text>
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
