import './Admin.scss'
import { useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import DataTable from 'react-data-table-component'

const JoinedTrips = () => {
  const [post, setPost] = useState([])

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
      (item.passenger_name &&
        item.passenger_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.passenger_email &&
        item.passenger_email
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.vehicle_name &&
        item.vehicle_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.departure &&
        item.departure.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.destination &&
        item.destination.toLowerCase().includes(filterText.toLowerCase()))
  )
  const columns = [
    {
      name: 'Joined Trip ID',
      selector: (row) => row.my_trip_id,
      sortable: true,
    },
    {
      name: 'Driver Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Driver Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Driver Tel',
      selector: (row) => row.tel,
      sortable: true,
    },
    {
      name: 'Departure',
      selector: (row) => row.departure,
      sortable: true,
    },
    {
      name: 'Departure Point',
      selector: (row) => row.departure_point,
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
      name: 'Joined Trip Status',
      selector: (row) => row.my_trip_status,
      sortable: true,
    },
    {
      name: 'Trip Seats',
      selector: (row) => row.seats,
      sortable: true,
    },
    {
      name: 'Passenger Name',
      selector: (row) => row.passenger_name,
      sortable: true,
    },
    {
      name: 'Passenger Email',
      selector: (row) => row.passenger_email,
      sortable: true,
    },
    {
      name: 'Trip ID',
      selector: (row) => row.trip_id,
      sortable: true,
    },
    {
      name: 'Vehicle ID',
      selector: (row) => row.vehicle_id,
      sortable: true,
    },

    {
      name: 'Vehicle',
      selector: (row) => row.vehicle_name,
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
  }, [])
  const ViewStuff = () => {
    const user = cookies.user

    const data = {
      request: 'admin_joined_trip',
      user: user,
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const trip_request = response.data
      //alert(trip_request)
      setPost(trip_request)
      console.log(trip_request)
    })
  }

  return (
    <div className="admin-container">
      <div className="TableContainer">
        <DataTable
          className=""
          title="Joined Trips"
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

export default JoinedTrips
