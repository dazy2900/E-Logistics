import './Admin.scss'
import Mynavbar from '../Mynavbar/Mynavbar'
import JoinedTrips from './JoinedTrips'
import Vehicles from './Vehicles'
import Users from './Users'
import Trips from './Trips'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import AdminImage from '../../images/admin.png'
import AdminRequest from './AdminRequests'
import Payment from './PaymentRequests'

const Admin = () => {
  const [selected, setSelected] = useState(false)
  const [CurrentSection, setCurrentSection] = useState({
    SectionLoad: Users,
  })
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'Asection_to_load',
  ])

  useEffect(() => {
    const currentState = cookies.Asection_to_load
    if (currentState == 'Users') {
      setCurrentSection({ SectionLoad: Users })
    } else if (currentState == 'Trips') {
      setCurrentSection({ SectionLoad: Trips })
    } else if (currentState == 'JoinedTrips') {
      setCurrentSection({ SectionLoad: JoinedTrips })
    } else if (currentState == 'Vehicles') {
      setCurrentSection({ SectionLoad: Vehicles })
    } else if (currentState == 'AdminRequest') {
      setCurrentSection({ SectionLoad: AdminRequest })
    } else if (currentState == 'Payment') {
      setCurrentSection({ SectionLoad: Payment })
    }
  }, [cookies])
  const PresentSection = (event) => {
    return <CurrentSection.SectionLoad />
  }
  const SectionLoader = (event) => {
    const section = event.target.id
    //alert(Page)
    setCookie('Asection_to_load', section, { path: '/' })

    if (section == 'Users') {
      setCurrentSection({ SectionLoad: Users })
    } else if (section == 'Trips') {
      setCurrentSection({ SectionLoad: Trips })
    } else if (section == 'JoinedTrips') {
      setCurrentSection({ SectionLoad: JoinedTrips })
    } else if (section == 'Vehicles') {
      setCurrentSection({ SectionLoad: Vehicles })
    } else if (section == 'AdminRequest') {
      setCurrentSection({ SectionLoad: AdminRequest })
    } else if (section == 'Payment') {
      setCurrentSection({ SectionLoad: Payment })
    }

    //  console.log(CurrentSection.SectionLoad)

    PresentSection(CurrentSection.SectionLoad)
  }

  return (
    <>
      <Mynavbar />
      <div className="my-container">
        <div className="">
          <div className="image-div">
            <img
              className="passenger-image"
              src={AdminImage}
              alt="passenger image"
            />
          </div>
          <div className="nav-div">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <button
                  class={
                    CurrentSection.SectionLoad == Users
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  id="Users"
                  onClick={SectionLoader}
                >
                  Users
                </button>
              </li>
              <li class="nav-item">
                <button
                  class={
                    CurrentSection.SectionLoad == Trips
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  id="Trips"
                  onClick={SectionLoader}
                >
                  Trips
                </button>
              </li>
              <li class="nav-item">
                <button
                  class={
                    CurrentSection.SectionLoad == JoinedTrips
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  id="JoinedTrips"
                  onClick={SectionLoader}
                >
                  Joined Trips
                </button>
              </li>
              <li class="nav-item">
                <button
                  class={
                    CurrentSection.SectionLoad == Vehicles
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  id="Vehicles"
                  onClick={SectionLoader}
                >
                  Vehicles
                </button>
              </li>
              <li class="nav-item">
                <button
                  class={
                    CurrentSection.SectionLoad == AdminRequest
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  id="AdminRequest"
                  onClick={SectionLoader}
                >
                  Verification Requests
                </button>
              </li>
              <li class="nav-item">
                <button
                  class={
                    CurrentSection.SectionLoad == Payment
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  id="Payment"
                  onClick={SectionLoader}
                >
                  Payment Requests
                </button>
              </li>
            </ul>
          </div>
          <div className="passenger-display">
            <PresentSection />
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
