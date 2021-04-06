import React, {useState, useContext} from 'react'
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap'

import UserContext from '../../../context/user/userContext'

const SignUp = () => {

    const userContext = useContext(UserContext)
    const {user, isLoading, signUpUser} = userContext

    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    
    const handleSubmit = (e, data) =>{
        e.preventDefault()
        if (data.password !== data.confirmPassword){
            // set alert passwords did not match
            console.log("passwords did not matched.")
        } else {
            signUpUser({
                username: data.username,
                password: data.password,
                email: data.email
            })
        }
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
                                
                                <Button variant="primary" type="submit" onClick={null}>
                                    <i className="fas fa-user-plus"></i> Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp
