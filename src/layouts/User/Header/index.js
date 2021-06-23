import React from 'react';
import './style.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className="navbar">
            <Navbar.Brand href="/">Together user</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#link">Match</Nav.Link>
                </Nav>
                <Nav className="dropdown-profile">
                    <NavDropdown title="Nguyen Manh" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/user/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/user/change-password">Change password</NavDropdown.Item>
                        <NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;