import './passenger.scss'
import PassengerImage from '../../../images/passengers.png'
import SearchTrips from './SearchTrip'
import { useEffect, useState } from 'react'
import PassengerTrip from './PassengerTrips'
import { useCookies } from 'react-cookie'

const Passenger = () => {
  const [selected, setSelected] = useState(false)
  const [CurrentSection, setCurrentSection] = useState({
    SectionLoad: SearchTrips,
  })
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'Psection_to_load',
  ])

  useEffect(() => {
    const currentState = cookies.Psection_to_load
    if (currentState == 'SearchTrips') {
      setCurrentSection({ SectionLoad: SearchTrips })
    } else if (currentState == 'MyTrip') {
      setCurrentSection({ SectionLoad: PassengerTrip })
    }
  }, [cookies])
  const PresentSection = (event) => {
    return <CurrentSection.SectionLoad />
  }
  const SectionLoader = (event) => {
    const section = event.target.id
    //alert(Page)
    setCookie('Psection_to_load', section, { path: '/' })

    if (section == 'SearchTrips') {
      setCurrentSection({ SectionLoad: SearchTrips })
    } else if (section == 'MyTrip') {
      setCurrentSection({ SectionLoad: PassengerTrip })
    }

    //  console.log(CurrentSection.SectionLoad)

    PresentSection(CurrentSection.SectionLoad)
  }
  return (
    <div className="my-container">
      <div className="image-div">
        <img
          className="passenger-image"
          src={PassengerImage}
          alt="passenger image"
        />
      </div>
      <div className="nav-div">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button
              class={
                CurrentSection.SectionLoad == SearchTrips
                  ? 'nav-link active'
                  : 'nav-link'
              }
              id="SearchTrips"
              onClick={SectionLoader}
            >
              Search Trip
            </button>
          </li>
          <li class="nav-item">
            <button
              class={
                CurrentSection.SectionLoad == PassengerTrip
                  ? 'nav-link active'
                  : 'nav-link'
              }
              id="MyTrip"
              onClick={SectionLoader}
            >
              My Trips
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

export default Passenger
