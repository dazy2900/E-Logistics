import './Admin.scss'
import { useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import CryptoJS from 'crypto-js'

const Users = () => {
  const [post, setPost] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'Asection_to_load',
  ])

  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const secretPass = 'secretPass@1234'

  const filteredItems = post.filter(
    (item) =>
      (item.name &&
        item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.date &&
        item.date.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.user_id &&
        item.user_id.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.tel && item.tel.toLowerCase().includes(filterText.toLowerCase())) ||
      (CryptoJS.AES.decrypt(item.referal, secretPass) &&
        CryptoJS.AES.decrypt(item.referal, secretPass)
          .toLowerCase()
          .includes(filterText.toLowerCase()))
  )
  post.map((data) => console.log(data.referal))
  console.log(post.referal)
  const columns = [
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
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Tel',
      selector: (row) => row.tel,
      sortable: true,
    },
    {
      name: 'Referal Code',
      selector: (row) => decryptData(row.referal),
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.user_status,
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
      request: 'admin_user',
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

  const decryptData = (decryptText) => {
    const bytes = CryptoJS.AES.decrypt(decryptText, secretPass)
    console.log(bytes)
    try {
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      console.log(data)
      return data
    } catch (err) {
      //console.log('error', err)
    }
  }
  return (
    <div className="admin-container">
      <div className="TableContainer">
        <DataTable
          className=""
          title="Users"
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

export default Users
