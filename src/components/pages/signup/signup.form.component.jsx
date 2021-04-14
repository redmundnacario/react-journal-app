import React from 'react'
import {Form} from 'react-bootstrap'

import Button from '../../shared/button/button.component'


const SignUpForm = (props) => {
    const {
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
        } = props

    console.log(email)
    return (
        <Form onSubmit={e => handleSubmit(e, {username, email, password, confirmPassword})}>

            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
        
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="6"
                    required
                />
            </Form.Group>

            <Form.Group controlId="confirmpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength="6"
                    required
                />
            </Form.Group>
            
            <Button
                {...button_props}
                isLoading = {isLoading}
            />
            {
                button_props_cancel && 
                <Button
                {...button_props_cancel}
                />
            }
        </Form>
    )
}

export default SignUpForm
