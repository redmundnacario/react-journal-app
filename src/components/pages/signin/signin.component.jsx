import React, {useState, useContext, useEffect} from 'react'
import {Container, Row, Col, Form, Card} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

import Button from '../../shared/button/button.component'

import AlertContext from '../../../context/alert/alertContext'
import UserContext from '../../../context/user/userContext'

const SignIn = () => {

    const alertContext = useContext(AlertContext)
    const userContext = useContext(UserContext)

    const {user, message, isLoading, logInUser} = userContext

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
  
    const handleSubmit = (e, data) =>{
        e.preventDefault()
        logInUser(data)
    }       


    useEffect(()=>{

        if(user){
            alertContext.setAlert({title: user.status, message: user.message})
            <Redirect to='/'/>;
        } else if (message){
            alertContext.setAlert({title: message.status, message: message.message})
        }
        // eslint-disable-next-line
    },[user, message])

    const button_props = {
        variant: "primary",
        text: "Sign In",
        type: "submit"
    }

    // i: (<i className="fas fa-door-open"></i>)

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

export default SignIn
