import './driver.scss'
import DriverImage from '../../../images/driver-img.png'
//import SearchTrips from './SearchTrip'
import { useEffect, useState } from 'react'
import DriverTrips from './DriverTrips'
import CreateTrip from './CreateTrip'
import OnGoingTrip from './OnGoingTrip'
import RegVehicle from './RegVehicle'
import TripPayment from './TripPayment'
import { useCookies } from 'react-cookie'

const Driver = () => {
  const [selected, setSelected] = useState(false)
  const [CurrentSection, setCurrentSection] = useState({
    SectionLoad: RegVehicle,
  })
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'section_to_load',
  ])

  useEffect(() => {
    const currentState = cookies.section_to_load
    if (currentState == 'CreateTrip') {
      setCurrentSection({ SectionLoad: CreateTrip })
    } else if (currentState == 'DriverTrips') {
      setCurrentSection({ SectionLoad: DriverTrips })
    } else if (currentState == 'OnGoingTrip') {
      setCurrentSection({ SectionLoad: OnGoingTrip })
    } else if (currentState == 'RegVehicle') {
      setCurrentSection({ SectionLoad: RegVehicle })
    } else if (currentState == 'TripPayment') {
      setCurrentSection({ SectionLoad: TripPayment })
    }
  }, [cookies])
  const PresentSection = (event) => {
    return <CurrentSection.SectionLoad />
  }
  const SectionLoader = (event) => {
    const section = event.target.id
    setCookie('section_to_load', section, { path: '/' })

    //alert(Page)
    if (section == 'CreateTrip') {
      setCurrentSection({ SectionLoad: CreateTrip })
    } else if (section == 'DriverTrips') {
      setCurrentSection({ SectionLoad: DriverTrips })
    } else if (section == 'OnGoingTrip') {
      setCurrentSection({ SectionLoad: OnGoingTrip })
    } else if (section == 'RegVehicle') {
      setCurrentSection({ SectionLoad: RegVehicle })
    } else if (section == 'TripPayment') {
      setCurrentSection({ SectionLoad: TripPayment })
    }

    //console.log(CurrentSection.SectionLoad)

    PresentSection(CurrentSection.SectionLoad)
  }
  return (
    <div className="my-container2">
      <div className="image-div2 mt-5">
        <img className="driver-image" src={DriverImage} alt="passenger image" />
      </div>
      <div className="nav-div">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button
              class={
                CurrentSection.SectionLoad == RegVehicle
                  ? 'nav-link active'
                  : 'nav-link'
              }
              id="RegVehicle"
              onClick={SectionLoader}
            >
              Register Vehicle
            </button>
          </li>
          <li class="nav-item">
            <button
              class={
                CurrentSection.SectionLoad == CreateTrip
                  ? 'nav-link active'
                  : 'nav-link'
              }
              id="CreateTrip"
              onClick={SectionLoader}
            >
              Create Trip
            </button>
          </li>
          <li class="nav-item">
            <button
              class={
                CurrentSection.SectionLoad == DriverTrips
                  ? 'nav-link active'
                  : 'nav-link'
              }
              id="DriverTrips"
              onClick={SectionLoader}
            >
              My Trips
            </button>
          </li>
          <li class="nav-item">
            <button
              class={
                CurrentSection.SectionLoad == OnGoingTrip
                  ? 'nav-link active'
                  : 'nav-link'
              }
              id="OnGoingTrip"
              onClick={SectionLoader}
            >
              On Going Trip
            </button>
          </li>
          <li class="nav-item">
            <button
              class={
                CurrentSection.SectionLoad == TripPayment
                  ? 'nav-link active'
                  : 'nav-link'
              }
              id="TripPayment"
              onClick={SectionLoader}
            >
              Trip Payment
            </button>
          </li>
        </ul>
      </div>

      <div className="passenger-display">
        <PresentSection />
      </div>
    </div>
  )
}

export default Driver
