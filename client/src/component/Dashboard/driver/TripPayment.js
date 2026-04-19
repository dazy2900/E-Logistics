import './driver.scss'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const baseURL = 'http://localhost/Travelbro/api.php'

const TripPayment = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'page_to_load',
    'UserInfo',
    'UserDp',
    'ReferralCode',
  ])

  useEffect(() => {
    Price()
  }, [totalPrice])

  const Price = () => {
    const user = cookies.user
    //alert(user)
    const data = {
      request: 'trips_payment',
      user: user,
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const trips_payment = response.data
      //alert(trip_request)
      console.log(trips_payment)
      setTotalPrice(trips_payment)
    })
  }
  const RequestsPayment = (e) => {
    const user = cookies.user
    //alert(user)
    const data = {
      request: 'payment_request',
      user: user,
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const payment_request = response.data
      //alert(trip_request)
      console.log(payment_request)
      //setTotalPrice(payment_request)
    })
  }

  return (
    <div className="payment-div center">
      <div className="row payment-row mb-3">
        <div className="col-4 payment-text ">Wallet</div>
        <div className="col-4 ">
          <hr />
        </div>
        <div className="col-4 payment-text">
          &#8358; {totalPrice}
          <br />
          <span className="pending-text">
            {' '}
            {totalPrice != 0 ? 'Pending Payment' : ' '}
          </span>
        </div>
      </div>
      {/*<button
        className="btn btn-primary payment-button"
        onClick={RequestsPayment}
        name="request"
      >
        Request Payment
      </button>*/}
    </div>
  )
}

export default TripPayment
