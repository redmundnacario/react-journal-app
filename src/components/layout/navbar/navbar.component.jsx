import React from 'react'
import {Link} from 'react-router-dom'
import { Navbar as NavbarB, Nav} from 'react-bootstrap'

const Navbar = () => {
    return (
       
        <NavbarB collapseOnSelect expand="lg" bg="dark" variant="dark">
            <div className="container d-flex">
                <NavbarB.Brand as={Link} to="/"><h2><i className="far fa-calendar-check"></i> TaskTracker</h2></NavbarB.Brand>
                <NavbarB.Toggle aria-controls="responsive-navbar-nav" />
                <NavbarB.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/signup"><i className="fas fa-user-plus"></i> SignUp</Nav.Link>
                        <Nav.Link as={Link} to="/signin"><i className="fas fa-sign-in-alt"></i> SignIn</Nav.Link>
                    </Nav>
                </NavbarB.Collapse>
            
            </div>
        </NavbarB>

    )
}

export default Navbar
