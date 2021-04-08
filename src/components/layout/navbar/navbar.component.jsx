import React, {useContext, Fragment} from 'react'
import {Link} from 'react-router-dom'
import { Navbar as NavbarB, Nav} from 'react-bootstrap'

//context
import UserContext from '../../../context/user/userContext'

const Navbar = () => {

    const userContext = useContext(UserContext)
    const {token} = userContext

    return (
       
        <NavbarB collapseOnSelect expand="lg" bg="dark" variant="dark">
            <div className="container d-flex">
                <NavbarB.Brand as={Link} to="/"><h2><i className="far fa-calendar-check"></i> TaskTracker</h2></NavbarB.Brand>
                <NavbarB.Toggle aria-controls="responsive-navbar-nav" />
                <NavbarB.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                    {
                        token ?
                        <Fragment>
                            <Nav.Link as={Link} to="/journals">Journals</Nav.Link>
                            <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
                            <Nav.Link as={Link} to="/account">Account</Nav.Link>
                            <Nav.Link>Logout</Nav.Link>
                        </Fragment>
                        :
                        <Fragment>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
                            <Nav.Link as={Link} to="/signin">SignIn</Nav.Link>
                        </Fragment>
                    }
                    </Nav>
                </NavbarB.Collapse>
            
            </div>
        </NavbarB>

    )
}

export default Navbar
