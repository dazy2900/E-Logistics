import './Admin.scss'
import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import DataTable from 'react-data-table-component'
import { ImCross } from 'react-icons/im'
import { GiCheckMark } from 'react-icons/gi'

const Payment = () => {
  const [post, setPost] = useState([])
  const [paymentRes, setPaymentRes] = useState([])

  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'Asection_to_load',
  ])

  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

  const filteredItems = post.filter(
    (item) =>
      (item.driver_name &&
        item.driver_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.driver_email &&
        item.driver_email.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.passenger_email &&
        item.passenger_email
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.departure &&
        item.departure.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.destination &&
        item.destination.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.bank && item.bank.toLowerCase().includes(filterText.toLowerCase()))(
        item.trips_id &&
          item.trip_id.toLowerCase().includes(filterText.toLowerCase())
      )
  )

  const columns = [
    {
      name: 'Payment ID',
      selector: (row) => row.payment_id,
      sortable: true,
    },
    {
      name: 'Driver Name',
      selector: (row) => row.driver_name,
      sortable: true,
    },
    {
      name: 'Driver Email',
      selector: (row) => row.driver_email,
      sortable: true,
    },
    {
      name: 'Trip ID',
      selector: (row) => row.trips_id,
      sortable: true,
    },
    {
      name: 'Driver Tel',
      selector: (row) => row.driver_tel,
      sortable: true,
    },
    {
      name: 'Departure',
      selector: (row) => row.departure,
      sortable: true,
    },
    {
      name: 'Destination',
      selector: (row) => row.destination,
      sortable: true,
    },
    {
      name: 'Trip Price',
      selector: (row) => row.trip_price,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'Time',
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: 'Payment Status',
      selector: (row) => row.payment_status,
      sortable: true,
    },
    {
      name: 'Bank',
      selector: (row) => row.bank,
      sortable: true,
    },
    {
      name: 'Account Number',
      selector: (row) => row.acc_numb,
      sortable: true,
    },
    {
      name: 'Wallet',
      selector: (row) => row.walllet,
      sortable: true,
    },
    {
      name: 'Paid',
      selector: (row) => (
        <GiCheckMark
          className="accept-icon center"
          id={row.trips_id + ' ' + row.driver_email + ' ' + 'Paid'}
          onClick={Response}
          size={20}
        />
      ),
      sortable: true,
    },
    {
      name: 'Cancel',
      selector: (row) => (
        <ImCross
          className="cancel-icon center"
          id={row.trips_id + ' ' + 'canceled'}
          onClick={Response}
          size={15}
        />
      ),
      sortable: true,
    },
  ]

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    return (
      <>
        <input
          className="TextField"
          id="search"
          type="text"
          placeholder="Filter By Name"
          aria-label="Search Input"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <div className="ClearButton" type="button" onClick={handleClear}>
          x
        </div>
      </>
    )
  }, [filterText, resetPaginationToggle])

  const baseURL = 'http://localhost/Travelbro/api.php'
  useEffect(() => {
    ViewStuff()
  }, [paymentRes])
  const ViewStuff = () => {
    const user = cookies.user

    const data = {
      request: 'admin_payment_request',
      user: user,
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const trip_request = response.data
      //alert(trip_request)
      setPost(trip_request)
      console.log(post)
    })
  }
  const Response = (e) => {
    const TargetId = e.currentTarget.id
    const IdArray = TargetId.split(' ')
    const id = IdArray[0]
    const user = IdArray[1]
    const response = IdArray[2]

    const datas = {
      request: 'admin_payment_response',
      response: response,
      id: id,
      user: user,
    }
    const new_data = JSON.stringify(datas)

    axios.post(baseURL, new_data).then((response) => {
      const trip_response = response.data
      console.log(trip_response)
      setPaymentRes(id)
    })
  }

  return (
    <div className="admin-container">
      <div className="TableContainer">
        <DataTable
          className=""
          title="Payment"
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
        />
      </div>
    </div>
  )
}

export default Payment
