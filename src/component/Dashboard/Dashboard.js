import './Dashboard.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { IoIosPeople } from 'react-icons/io'
import { FaCarSide, FaPowerOff } from 'react-icons/fa'
import Passenger from './passenger/passenger'
import Driver from './driver/driver'
import Signin from './../Register/Signin'
import { useCookies } from 'react-cookie'
import CompleteSignup from './driver/Modal'
import Dashnavbar from '../Mynavbar/DashNav'
import Logo from '../../images/travelbro-blue-nav.png'
import CryptoJS from 'crypto-js'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const baseURL = 'http://localhost/Travelbro/api.php'
const imageURL = 'http://localhost/Travelbro/'

const secretPass = 'secretPass@1234'

const Dashboard = () => {
  const [post, setPost] = useState('')
  const [Dp, setDp] = useState('')
  const [encrptedData, setEncrptedData] = useState('')
  const [modalShow, setModalshow] = useState(false)

  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'page_to_load',
    'UserInfo',
    'UserDp',
    'ReferralCode',
  ])
  const [CurrentPage, setCurrentPage] = useState({
    PageLoad: cookies.page_to_load,
  })
  const ModalClose = () => setModalshow(false)
  const ModalShow = () => {
    encryptData()
    setModalshow(true)
  }

  const user = cookies.user
  useEffect(() => {
    let currentState = cookies.page_to_load
    //alert(currentState)
    if (currentState == 'Passenger') {
      setCurrentPage({ PageLoad: Passenger })
    } else if (currentState == 'Driver') {
      setCurrentPage({ PageLoad: Driver })
    } else if (
      currentState == null ||
      currentState == undefined ||
      currentState == ''
    ) {
      setCurrentPage({ PageLoad: Passenger })
    }

    CompleteSign()
    //alert(cookies.status)

    console.log(user)
    if (user == '' || user == undefined || user == null) {
      window.location.href = '/signin'
    }
    const UserData = cookies.UserInfo
    const UserDp = cookies.UserDp
    if (UserData !== undefined || UserData !== '') {
      setPost(UserData)
      setDp(UserDp)
      //alert(Dp)
    }
  }, [cookies])
  const CompleteSign = () => {
    if (CurrentPage.PageLoad == Driver && cookies.status == 'Passenger') {
      return <CompleteSignup />
    }
  }

  const encryptData = () => {
    const ReferralCode = CryptoJS.AES.encrypt(
      JSON.stringify(user),
      secretPass
    ).toString()

    setEncrptedData(ReferralCode)
    setCookie('ReferralCode', ReferralCode, { path: '/' })
    console.log(ReferralCode)
    console.log(encrptedData)
  }

  const Present = () => {
    return <CurrentPage.PageLoad />
  }

  const pageLoader = (event) => {
    const Page = event.target.id
    setCookie('page_to_load', Page, { path: '/' })
    //alert(Page)
    if (Page == 'Passenger') {
      setCurrentPage({ PageLoad: Passenger })
    } else if (Page == 'Driver') {
      setCurrentPage({ PageLoad: Driver })
    }
    //setCurrentPage({ PageLoad: Page })
    console.log(CurrentPage.PageLoad)

    //Present(CurrentPage.PageLoad)
  }
  const LogOut = () => {
    window.location.href = '/'
    removeCookie('user', { path: '/' })
  }
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
        <Modal.Body>
          <div className="referral-div">{cookies.ReferralCode}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={ModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="my-container1 dashboard-section">
        <div className="flex-container">
          <div className="menu-container border-outline-danger">
            <div className="profile-pic-div center">
              <div className="profile-icon profile-pic icon">
                <img
                  src={imageURL + Dp}
                  alt={<CgProfile size={90} />}
                  className="profile-pic"
                />
              </div>
              <div className="">{post.name}</div>
              <div className="referral-code" onClick={ModalShow}>
                <u>Referral Code</u>
              </div>
            </div>
            <div className="menu-div">
              <div
                className="passenger-div"
                id="Passenger"
                onClick={pageLoader}
              >
                <div className="passenger-icon icon">
                  <IoIosPeople size={30} />
                </div>
                <div className="passenger-text">Passenger</div>{' '}
              </div>
              <div className="driver-div" id="Driver" onClick={pageLoader}>
                <div className="driver-icon icon">
                  <FaCarSide size={30} />
                </div>
                <div className="driver-text">Driver</div>
              </div>
            </div>
            <div className="logout-div" onClick={LogOut}>
              <div className="logout-icon icon">
                <FaPowerOff size={20} />
              </div>
              Log Out
            </div>
          </div>
          <div className="display-container ">
            <div className="row nav-box">
              <div className="col-10">
                <div align="left" className="dash-logo-div">
                  <img src={Logo} className="dash-logo" />
                </div>
              </div>
              <div className="col-2 nav-icon-div center pl-2">
                <Dashnavbar />
              </div>
            </div>
            <CompleteSign />
            <Present />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
