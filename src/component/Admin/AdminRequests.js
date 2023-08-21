import './Admin.scss'
import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import DataTable from 'react-data-table-component'
import { ImCross } from 'react-icons/im'
import { GiCheckMark } from 'react-icons/gi'

const AdminRequest = () => {
  const [users, setUsers] = useState([])
  const [usersRes, setUsersRes] = useState([])
  const [trips, setTrips] = useState([])
  const [tripsRes, setTripsRes] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [vehiclesRes, setVehiclesRes] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'Asection_to_load',
  ])

  const [filterUser, setFilterUser] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const user_filteredItems = users.filter(
    (item) =>
      (item.name &&
        item.name.toLowerCase().includes(filterUser.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(filterUser.toLowerCase())) ||
      (item.date &&
        item.date.toLowerCase().includes(filterUser.toLowerCase())) ||
      (item.user_id &&
        item.user_id.toLowerCase().includes(filterUser.toLowerCase())) ||
      (item.tel && item.tel.toLowerCase().includes(filterUser.toLowerCase()))
  )
  const user_columns = [
    {
      name: 'User ID',
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Tel',
      selector: (row) => row.tel,
      sortable: true,
    },
    {
      name: 'ID card Type',
      selector: (row) => row.idcard_type,
      sortable: true,
    },
    {
      name: 'ID Number',
      selector: (row) => row.idcard_number,
      sortable: true,
    },
    {
      name: 'Driver Lincense Number',
      selector: (row) => row.driver_lincense_number,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: 'Time',
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: 'Authorize',
      selector: (row) => (
        <GiCheckMark
          className="accept-icon center"
          id={row.user_id + ' ' + 'verified'}
          onClick={UserResponse}
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
          id={row.user_id + ' ' + 'canceled'}
          onClick={UserResponse}
          size={15}
        />
      ),
      sortable: true,
    },
  ]

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterUser) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterUser('')
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
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
        />
        <div className="ClearButton" type="button" onClick={handleClear}>
          x
        </div>
      </>
    )
  }, [filterUser])

  const [filterTrip, setFilterTrip] = useState('')
  //const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const filteredTrip = trips.filter(
    (item) =>
      (item.driver_name &&
        item.driver_name.toLowerCase().includes(filterTrip.toLowerCase())) ||
      (item.driver_email &&
        item.driver_email.toLowerCase().includes(filterTrip.toLowerCase())) ||
      (item.vehicle_name &&
        item.vehicle_name.toLowerCase().includes(filterTrip.toLowerCase())) ||
      (item.departure &&
        item.departure.toLowerCase().includes(filterTrip.toLowerCase())) ||
      (item.destination &&
        item.destination.toLowerCase().includes(filterTrip.toLowerCase())) ||
      (item.plate_number &&
        item.plate_number.toLowerCase().includes(filterTrip.toLowerCase()))
  )
  const trip_columns = [
    {
      name: 'Trip ID',
      selector: (row) => row.trip_id,
      sortable: true,
    },
    {
      name: 'Driver Name',
      selector: (row) => row.name,
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
      name: 'Driver Verification Status',
      selector: (row) => row.driver_verification_status,
      sortable: true,
    },
    {
      name: 'Vehicle Verification Status',
      selector: (row) => row.vehicle_verification_status,
      sortable: true,
    },
    {
      name: 'Trip Seats',
      selector: (row) => row.trip_seats,
      sortable: true,
    },
    {
      name: 'Vehicle Name',
      selector: (row) => row.vehicle_name,
      sortable: true,
    },
    {
      name: 'Vehicle ID',
      selector: (row) => row.vehicle_id,
      sortable: true,
    },
    {
      name: 'Vehicle Capacity',
      selector: (row) => row.vehicle_capacity,
      sortable: true,
    },
    {
      name: 'Available Seats',
      selector: (row) => row.available_seats,
      sortable: true,
    },
    {
      name: 'Authorize',
      selector: (row) => (
        <GiCheckMark
          className="accept-icon center"
          id={row.trip_id + ' ' + 'verified'}
          onClick={TripResponse}
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
          id={row.trip_id + ' ' + 'canceled'}
          onClick={TripResponse}
          size={15}
        />
      ),
      sortable: true,
    },
  ]

  const subHeaderComponentMemoTrip = useMemo(() => {
    const handleClear = () => {
      if (filterUser) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterTrip('')
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
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
        />
        <div className="ClearButton" type="button" onClick={handleClear}>
          x
        </div>
      </>
    )
  }, [filterTrip])

  const [filterVehicle, setFilterVehicle] = useState('')
  //const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const filteredVehicle = vehicles.filter(
    (item) =>
      (item.driver_name &&
        item.driver_name.toLowerCase().includes(filterVehicle.toLowerCase())) ||
      (item.driver_email &&
        item.driver_email
          .toLowerCase()
          .includes(filterVehicle.toLowerCase())) ||
      (item.vehicle_name &&
        item.vehicle_name
          .toLowerCase()
          .includes(filterVehicle.toLowerCase())) ||
      (item.date &&
        item.date.toLowerCase().includes(filterVehicle.toLowerCase())) ||
      (item.vehicle_id &&
        item.vehicle_id.toLowerCase().includes(filterVehicle.toLowerCase())) ||
      (item.vehicle_lincense_number &&
        item.vehicle_lincense_number
          .toLowerCase()
          .includes(filterVehicle.toLowerCase())) ||
      (item.vehicle_colour &&
        item.vehicle_colour
          .toLowerCase()
          .includes(filterVehicle.toLowerCase())) ||
      (item.plate_number &&
        item.plate_number.toLowerCase().includes(filterVehicle.toLowerCase()))
  )
  const vehicle_columns = [
    {
      name: 'Vehicle ID',
      selector: (row) => row.vehicle_id,
      sortable: true,
    },
    {
      name: 'Vehicle Name',
      selector: (row) => row.vehicle_name,
      sortable: true,
    },
    {
      name: 'Vehicle Picture',
      selector: (row) => row.vehicle_picture,
      sortable: true,
    },
    {
      name: 'Vehicle Lincense Number',
      selector: (row) => row.vehicle_lincense_number,
      sortable: true,
    },
    {
      name: 'Vehicle Capacity',
      selector: (row) => row.vehicle_capacity,
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
      name: 'Date',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'Authorize',
      selector: (row) => (
        <GiCheckMark
          className="accept-icon center"
          id={row.vehicle_id + ' ' + 'verified'}
          onClick={VehicleResponse}
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
          id={row.vehicle_id + ' ' + 'canceled'}
          onClick={VehicleResponse}
          size={15}
        />
      ),
      sortable: true,
    },
  ]

  const subHeaderComponentMemoVehicle = useMemo(() => {
    const handleClear = () => {
      if (filterVehicle) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterVehicle('')
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
          value={filterVehicle}
          onChange={(e) => setFilterVehicle(e.target.value)}
        />
        <div className="ClearButton" type="button" onClick={handleClear}>
          x
        </div>
      </>
    )
  }, [filteredVehicle])

  const baseURL = 'http://localhost/Travelbro/api.php'
  useEffect(() => {
    DisplayUsers()
    //DisplayTrips()
    //DisplayVehicle()
  }, [usersRes])

  useEffect(() => {
    //DisplayUsers()
    DisplayTrips()
    //DisplayVehicle()
  }, [tripsRes])

  useEffect(() => {
    //DisplayUsers()
    //DisplayTrips()
    DisplayVehicle()
  }, [vehiclesRes])
  const DisplayUsers = () => {
    //const user = cookies.user
    //alert('4444')
    const data = {
      request: 'admin_user_request',
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const user_verification_request = response.data
      //alert(trip_request)

      setUsers(user_verification_request)

      console.log(users)
    })
  }

  const UserResponse = (e) => {
    const TargetId = e.currentTarget.id
    const IdArray = TargetId.split(' ')
    const id = IdArray[0]
    const response = IdArray[1]

    //alert(id)

    //alert(response)
    const datas = {
      request: 'user_verification_response',
      response: response,
      id: id,
    }
    const new_data = JSON.stringify(datas)

    axios.post(baseURL, new_data).then((response) => {
      const user_response = response.data
      setUsersRes(id)
      console.log(user_response)
    })
  }

  const DisplayTrips = () => {
    //const user = cookies.user

    const data = {
      request: 'admin_trip_request',
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const trip_verification_request = response.data
      //alert(trip_request)
      setTrips(trip_verification_request)
      console.log(trips)
    })
  }

  const TripResponse = (e) => {
    const TargetId = e.currentTarget.id
    const IdArray = TargetId.split(' ')
    const id = IdArray[0]
    const response = IdArray[1]

    const datas = {
      request: 'trip_verification_response',
      response: response,
      id: id,
      //user: user,
    }
    const new_data = JSON.stringify(datas)

    axios.post(baseURL, new_data).then((response) => {
      const trip_response = response.data
      console.log(trip_response)
      setTripsRes(id)
    })
  }

  const DisplayVehicle = () => {
    //const user = cookies.user

    const data = {
      request: 'vehicle_trip_request',
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const vehicle_verification_request = response.data
      //alert(trip_request)
      //console.log(driver_trips)
      setVehicles(vehicle_verification_request)
    })
  }

  const VehicleResponse = (e) => {
    const TargetId = e.currentTarget.id
    const IdArray = TargetId.split(' ')
    const id = IdArray[0]
    const response = IdArray[1]

    const datas = {
      request: 'vehicle_verification_response',
      response: response,
      id: id,
      //user: user,
    }
    const new_data = JSON.stringify(datas)

    axios.post(baseURL, new_data).then((response) => {
      const vehicle_response = response.data
      console.log(vehicle_response)
      setVehiclesRes(id)
    })
  }

  return (
    <div className="admin-container">
      <div className="TableContainer">
        <DataTable
          className=""
          title="Users Verification"
          columns={user_columns}
          data={user_filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          highlightOnHover
        />
      </div>
      <div className="TableContainer">
        <DataTable
          className=""
          title="Trips Verification"
          columns={trip_columns}
          data={filteredTrip}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemoTrip}
          persistTableHead
          fixedHeaderScrollHeight="300px"
          highlightOnHover
        />
      </div>
      <div className="TableContainer">
        <DataTable
          className=""
          title="Vehicle Verification"
          columns={vehicle_columns}
          data={filteredVehicle}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemoVehicle}
          persistTableHead
          highlightOnHover
        />
      </div>
    </div>
  )
}

export default AdminRequest
