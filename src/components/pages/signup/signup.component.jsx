import React, {useState, useContext, useEffect} from 'react'
import {Container, Row, Col, Form, Card} from 'react-bootstrap'


import Button from '../../shared/button/button.component'


import UserContext from '../../../context/user/userContext'
import AlertContext from '../../../context/alert/alertContext'

const SignUp = () => {

    const alertContext = useContext(AlertContext)
    const userContext = useContext(UserContext)

    const {user, message, isLoading, signUpUser} = userContext

    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    
    const handleSubmit = (e, data) =>{
        e.preventDefault()
        if (data.password !== data.confirmPassword){
            // set alert passwords did not match
            alertContext.setAlert({title: "Error", message: "Passwords did not match."})
        } else {
            signUpUser({
                username: data.username,
                password: data.password,
                email: data.email
            })
        }
    }

    useEffect(()=>{

        if(user){
            alertContext.setAlert({title: user.status, message: user.message})
        } else if (message){
            alertContext.setAlert({title: message.status, message: message.message})
        }
        // eslint-disable-next-line
    },[user, message])

    const button_props = {
        variant: "primary",
        text: "Sign Up",
        type: "submit"
    }


    return (
        <Container>
            <Row className="mt-5">
                <Col>
                <h1>Insert image here</h1>
                </Col>
                
                <Col className="sign-up-form">
                    <Card>
                        <Card.Body>
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
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp
