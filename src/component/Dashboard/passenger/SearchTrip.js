import './passenger.scss'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowDown,
} from 'react-icons/hi'
import {
  MdOutlinePersonOutline,
  MdOutlineAirlineSeatReclineNormal,
} from 'react-icons/md'
import { BsCreditCardFill } from 'react-icons/bs'
import { usePaystackPayment } from 'react-paystack'
import PaystackHookExample from './payment'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

//const cookies = new Cookies()

const SearchTrips = () => {
  const [inputs, setInputs] = useState('')
  const [post, setPost] = useState([])
  const [bookedData, setBookedData] = useState([])
  const [seatNumber, setSeatNumber] = useState(1)
  const [bookedPrice, setBookedPrice] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'page_to_load',
    'input',
    'price',
  ])
  const [modalShow, setModalShow] = useState(false)
  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const imageURL = 'http://localhost/Travelbro/'
  const baseURL = 'http://localhost/Travelbro/api.php'

  useEffect(() => {
    if (cookies.input) {
      const user = cookies.user
      console.log(cookies.input)
      //alert('done')
      const datas = {
        request: 'search_trip',
        data: cookies.input,
        user: user,
      }

      const new_data = JSON.stringify(datas)
      //const new_data2 = JSON.parse(new_data)

      axios.post(baseURL, new_data).then((response) => {
        const search_data = response.data
        console.log(search_data)
        setPost(search_data)
        //alert(post)
        let posts = post
        console.log(posts)
      })
    }
  }, [])

  const TotalPrice = () => {}
  const change_handler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  const submit_handler = (e) => {
    e.preventDefault()
    console.log(inputs)
    const user = cookies.user
    //alert('done')
    const datas = {
      request: 'search_trip',
      data: inputs,
      user: user,
    }

    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const search_data = response.data
      console.log(search_data)
      //const amounts = search_data[0].trip_price
      setPost(search_data)
      console.log(post)
      //alert(post)
      //setPrice('noooooo')
      //console.log(post[0].trip_price)
      //console.log(price)
      setCookie('input', inputs, { path: '/' })

      //const json_data = JSON.parse(post)
      //alert(json_data.departure)
      // if (!.length) return <div>No data</div>;
    })
  }
  const config = {
    reference: new Date().getTime().toString(),
    email: cookies.user,
    amount: bookedPrice,
    publicKey: 'pk_live_09c77e40e978d48d71865e8a5efd59bd0e089ddb',
    //pk_test_64126f61df754329ea3017aa6288110785b7cf1d
  }
  //console.log(post[0].trip_price)
  // you can call this function anything
  const onSuccess = (reference, e) => {
    // Implementation for whatever you want to do with reference and after success call.
    const id = e.target.id
    const user = cookies.user
    alert(user)
    const datas = {
      request: 'join_trip',
      data: id,
      user: user,
    }
    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const Join_trip = response.data
      alert(Join_trip)
    })
    console.log(reference)
    alert(reference)
  }

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }
  const initializePayment = usePaystackPayment(config)
  const Pstack = () => {
    initializePayment(onSuccess, onClose)
  }
  /*const Paystack = () => {
    if (statePrice !== 1) {
      // return <PaystackHookExample Config={config} />
    }
  }*/

  const TripModal = (e) => {
    e.preventDefault()
    const TargetId = e.currentTarget.id
    const IdArray = TargetId.split(' ')
    const id = IdArray[0]
    const Tprice = IdArray[1]
    const TotalPrice1 = Tprice * seatNumber * 100
    const user = cookies.user
    setBookedPrice(TotalPrice1)
    console.log(bookedData)

    const datas = {
      request: 'trip_modal',
      id: id,
      user: user,
    }

    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const search_data = response.data
      console.log(search_data)
      setBookedData(search_data)
      console.log(bookedData)
      console.log(bookedPrice)
      //console.log(testTotalPrice)
      //console.log(cookies.price)
    })
    setModalShow(true)
  }

  const JoinTrip = () => {
    Pstack()
    //const testTotalPrice = TotalPrice1
    //setCookie('price', TotalPrice1, { path: '/' })
    //setStatePrice(testTotalPrice)
    //handleShow()
    //setModalShow(true)
    //Paystack()
    /*const TestAwait = async () => {
      setCookie('price', TotalPrice1, { path: '/' })
    }
    TestAwait().then(Pstack())
    if (cookies.price) {
      Pstack()
    }*/
  }

  //useEffect(() => {}, [statePrice])
  return (
    <div className="SearchTrip">
      <>
        <Modal
          show={modalShow}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="Modal-title">
                Thank you for choosing travelbro. Please note that your payment
                is safe and you will get full refund if the car owner defaults.
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {bookedData &&
              bookedData.map((data1, idx) => {
                return (
                  <table
                    key={idx}
                    className="table  modal-table-container center port-map mt-4"
                  >
                    <tr>
                      <td className="date-time ">
                        {data1.date}
                        <br />
                        {data1.time}
                      </td>
                      <td className="departure ">
                        <div className="departure-div">{data1.departure}</div>

                        <div className="point-div">{data1.departure_point}</div>
                      </td>
                      <td className="arrow-icon ">
                        <HiOutlineArrowNarrowRight size={45} />
                      </td>
                      <td className="pb-4 destination ">{data1.destination}</td>
                    </tr>

                    <tr className="middle-row">
                      <td></td>
                      <td className="arrow-icon "></td>
                      <td colSpan="2">
                        <div className="center modal-price"></div>
                      </td>
                    </tr>

                    <tr className="">
                      <td className="dp">
                        <img
                          className="dp-image"
                          src={imageURL + data1.profile_picture}
                        />
                      </td>
                      <td className=" ">
                        {' '}
                        <div className="d-info">{data1.name}</div>
                      </td>
                      <td className=" ">
                        {' '}
                        <div className="modal-price-text">
                          Price for {seatNumber} seat(s)
                        </div>
                      </td>
                      <td className="modal-price">
                        &#8358; {bookedPrice / 100}
                      </td>
                    </tr>
                  </table>
                )
              })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={JoinTrip}>
              Continue
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <form onSubmit={submit_handler}>
        <div className="banner-form2 row">
          <div className="rows col-sm-3">
            <input
              type="text"
              className="text-box"
              name="departure"
              placeholder=" Leaving from..."
              value={inputs.departure}
              onChange={change_handler}
              required
            />
          </div>
          <div className="rows col-sm-3">
            <input
              type="text"
              className="text-box"
              name="destination"
              placeholder=" Going to..."
              value={inputs.destination}
              onChange={change_handler}
              required
            />
          </div>

          <div className="col-sm-3 mb-2">
            <div className="row">
              <div className="col-8">
                <input
                  type="date"
                  className="text-box"
                  name="date"
                  placeholder="Date"
                  value={inputs.date}
                  onChange={change_handler}
                />
              </div>
              <div className="col-4">
                <input
                  type="number"
                  className="text-box pas"
                  name="passengers"
                  placeholder="1"
                  value={inputs.passengers}
                  onChange={change_handler}
                />
              </div>
            </div>
          </div>
          <div className="button mt-2 col-sm-3">
            <input
              className="btn btn-dark    btn-block"
              value="Search"
              type="submit"
            />
          </div>
        </div>
      </form>
      {Array.isArray(post) &&
        post.map((data1, idx) => {
          return (
            <table
              key={idx}
              className="table  table-container1 center port-map mt-4"
            >
              <tr>
                <td className="date-time ">
                  {data1.date}
                  <br />
                  {data1.time}
                </td>
                <td className="departure ">
                  <div className="departure-div">{data1.departure}</div>

                  <div className="point-div">{data1.departure_point}</div>
                </td>
                <td></td>
                <td className="price">&#8358; {data1.trip_price}</td>
              </tr>

              <tr className="middle-row">
                <td>
                  <div className="d-info d-name">{data1.name}</div>
                </td>
                <td className="arrow-icon ">
                  <HiOutlineArrowNarrowDown size={45} />
                </td>
                <td>
                  <MdOutlineAirlineSeatReclineNormal size={33} />
                  <input
                    type="number"
                    className="text-box seat-numb"
                    name="seat_number_booked"
                    placeholder="1"
                    value={seatNumber}
                    onChange={(e) => setSeatNumber(e.target.value)}
                  />
                </td>
                <td></td>
              </tr>

              <tr className="">
                <td className="dp">
                  <img
                    className="dp-image"
                    src={imageURL + data1.profile_picture}
                  />
                </td>
                <td className="pb-4 destination ">{data1.destination}</td>
                <td className="seats ">
                  <MdOutlinePersonOutline size={35} />
                  {data1.trip_seats}
                </td>
                <td className="button ">
                  <BsCreditCardFill
                    className="center delete-icon"
                    id={data1.trip_id + ' ' + data1.trip_price}
                    onClick={TripModal}
                    color="#0695e8"
                    size={45}
                  />
                  <div className="book-trip">Book Trip</div>
                </td>
              </tr>
            </table>
          )
        })}
    </div>
  )
}

export default SearchTrips
