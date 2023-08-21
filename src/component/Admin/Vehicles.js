import './Admin.scss'
import { useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import DataTable from 'react-data-table-component'

const Vehicles = () => {
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
      (item.vehicle_name &&
        item.vehicle_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.date &&
        item.date.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.vehicle_id &&
        item.vehicle_id.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.vehicle_lincense_number &&
        item.vehicle_lincense_number
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.vehicle_colour &&
        item.vehicle_colour.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.plate_number &&
        item.plate_number.toLowerCase().includes(filterText.toLowerCase()))
  )
  const columns = [
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
      name: 'Vehicle Colour',
      selector: (row) => row.vehicle_colour,
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
      name: 'Time',
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: 'Vehicle Status',
      selector: (row) => row.vehicle_status,
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
      request: 'admin_vehicle',
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

  return (
    <div className="admin-container">
      <div className="TableContainer">
        <DataTable
          className=""
          title="Vehicles"
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

export default Vehicles
