import React, {useState, useContext} from 'react'
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap'

import UserContext from '../../../context/user/userContext'

const SignIn = () => {

    const userContext = useContext(UserContext)

    const {user, isLoading, logInUser} = userContext

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = (e, data) =>{
        e.preventDefault()
        logInUser(data)
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
                            <Form onSubmit={(e) => handleSubmit(e, {email, password})}>

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
                                
                                <Button variant="primary" type="submit" onClick={null}>
                                    Sign-In  <i className="fas fa-door-open"></i>
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default SignIn
