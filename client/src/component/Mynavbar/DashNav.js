import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import { FaBars } from 'react-icons/fa'
import navbarimg from '../../images/travelbro-blue-nav.png'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { useCookies } from 'react-cookie'
import Modal from 'react-bootstrap/Modal'

import './Mynavbar.scss'
import { Button } from 'react-bootstrap'

const Dashnavbar = () => {
  const [show, setShow] = useState(false)
  const [modalShow, setModalshow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const ModalClose = () => setModalshow(false)
  const ModalShow = () => setModalshow(true)

  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'page_to_load',
    'input',
    'input',
    'ReferralCode',
  ])
  return (
    <>
      <Modal
        size="lg"
        show={modalShow}
        onHide={ModalClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="Modaltitle">Referral Code</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{cookies.ReferralCode}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={ModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <FaBars
        className=" nav-icon mb-2 mt-2"
        size={40}
        color="black"
        onClick={handleShow}
      />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Travelbro</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column flex-grow-1 pe-3">
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
            <Nav.Link
              as={Link}
              to={'/signup '}
              onClick={() => {
                setCookie('page_to_load', 'Driver', { path: '/' })
              }}
            >
              Sign Up
            </Nav.Link>
            <Nav.Link
              as={Link}
              onClick={() => {
                ModalShow()
              }}
            >
              Referral Code
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Dashnavbar
