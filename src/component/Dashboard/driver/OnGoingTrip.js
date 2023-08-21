import './driver.scss'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Passenger from '../passenger/passenger'
import { HiOutlineArrowNarrowDown } from 'react-icons/hi'
import { MdOutlinePersonOutline, MdCancel } from 'react-icons/md'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { GiCheckMark } from 'react-icons/gi'

const DriverTrips = () => {
  const [post, setPost] = useState([])
  const [cancelTrip, setCancelTrip] = useState([])
  const [tripCompleted, setTripCompleted] = useState([])
  const [passenger, setPassenger] = useState([])
  const [ViewPassenger, setViewPassenger] = useState(false)
  const [cookies, setCookie] = useCookies(['user'])

  const imageURL = 'http://localhost/Travelbro/'
  const baseURL = 'http://localhost/Travelbro/api.php'
  useEffect(() => {
    ViewStuff()
  }, [cancelTrip, tripCompleted])
  const ViewStuff = () => {
    const user = cookies.user
    //alert(user)
    const data = {
      request: 'driver_trips',
      user: user,
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const driver_trips = response.data
      //alert(trip_request)
      console.log(driver_trips)
      setPost(driver_trips)
    })
  }
  const CancelTrip = (e) => {
    const id = e.target.id
    const user = cookies.user
    //alert(id)

    const datas = {
      request: 'cancel_trip',
      id: id,
      user: user,
    }
    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const cancel_trip = response.data
      setCancelTrip(cancel_trip)
      //alert(cancelTrip)
    })
  }

  const TripCompleted = (e) => {
    const id = e.currentTarget.id
    const user = cookies.user

    const datas = {
      request: 'driver_trip_completed',
      id: id,
      user: user,
    }

    const new_data = JSON.stringify(datas)

    axios.post(baseURL, new_data).then((response) => {
      const trip_completed = response.data
      setTripCompleted(trip_completed)
      //alert(trip_completed)
      // console.log(trip_completed)
    })
  }

  const ViewHandler = () => {
    if (ViewPassenger == 'ViewPassenger') {
      return <ViewPassengers />
    } else if (ViewPassenger != false) {
      return <ViewPassengers />
    }
  }
  const ViewClose = () => {
    setViewPassenger(false)
  }
  const ViewPassengers = () => {
    return (
      <div className="modal-container2">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6 center form-container2">
            <div className="passenger-container">
              <div className="x" onClick={ViewClose}>
                x
              </div>
              {passenger.map((data2, idx2) => {
                return (
                  <div className="row mb-3 ">
                    <div className="col-sm-2">{idx2}</div>
                    <div className="col-sm-5">{data2.name}</div>
                    <div className="col-sm-5">{data2.tel}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    )
  }
  const Passengers = (e) => {
    const id = e.target.id
    setViewPassenger('ViewPassengers')
    const user = cookies.get('user')
    //alert(id)

    const datas = {
      request: 'trip_passenger',
      id: id,
      user: user,
    }
    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const trip_passenger = response.data
      setPassenger(trip_passenger)
      console.log(passenger)
    })
  }
  return (
    <div className="my-container">
      <ViewHandler />
      {post &&
        post.map((data1, idx) => {
          return (
            <table
              key={idx}
              className="table table-container1 center port-map mt-4"
            >
              <tr>
                <td className="date-time ">
                  {data1.date}
                  <br />
                  {data1.time}
                </td>
                <td className="departure">
                  <div className="departure-div">{data1.departure}</div>

                  <div className="point-div">{data1.departure_point}</div>
                </td>
                <td className="price">&#8358; {data1.trip_price}</td>
                <td className="passanger-icon">
                  <div className="mb-1">
                    <BsFillPersonLinesFill
                      className="passenger-list-icon center"
                      id={data1.trip_id}
                      onClick={Passengers}
                      color="black"
                      size={30}
                    />
                    <div className="passenger-text">passengers</div>
                  </div>
                </td>
              </tr>

              <tr className="middle-row">
                <td></td>
                <td className="arrow-icon ">
                  <HiOutlineArrowNarrowDown size={45} />
                </td>
                <td></td>
                <td>
                  {' '}
                  <GiCheckMark
                    className="center delete-icon"
                    id={data1.trip_id}
                    onClick={TripCompleted}
                    color="black"
                    size={40}
                  />
                  <div className="complete-text">Trip Completed</div>
                </td>
              </tr>

              <tr>
                <td className="dp ">
                  {' '}
                  <img
                    className="dp-image"
                    src={imageURL + data1.vehicle_picture}
                  />
                </td>
                <td className="pb-4 destination ">{data1.destination}</td>
                <td className="seats ">
                  <MdOutlinePersonOutline size={40} />
                  {data1.trip_seats}
                </td>
                <td className="button ">
                  <MdCancel
                    className="center delete-icon"
                    id={data1.trips_id}
                    onClick={CancelTrip}
                    color="red"
                    size={40}
                  />
                  <div className="delete-text">Cancel Trip</div>
                </td>
              </tr>
              <tr>
                <td colSpan="5"></td>
              </tr>
            </table>
          )
        })}
    </div>
  )
}

export default DriverTrips
