import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'
import navbarimg from '../../images/travelbro-blue-nav.png'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { useCookies } from 'react-cookie'

import './Mynavbar.scss'

const Mynavbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'page_to_load',
    'input',
  ])
  return (
    <>
      {['md'].map((expand) => (
        <Navbar
          key={expand}
          bg="white"
          expand={expand}
          fixed="top"
          className="navbar-fixed-top"
        >
          <Container fluid>
            <Navbar.Brand href="#">
              <img src={navbarimg} alt="Travelbro" className="navbar-img" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to={'/'}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to={'/about '}>
                    About
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={'/dashboard '}
                    onClick={() => {
                      setCookie('page_to_load', 'Driver', { path: '/' })
                    }}
                  >
                    Publish a Ride
                  </Nav.Link>
                  <NavDropdown
                    title={<MdOutlinePersonOutline size={25} color="#8a8888" />}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/signin">Sign In</NavDropdown.Item>
                    <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}

export default Mynavbar
