import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import About from './component/About/About'
import Signup from './component/Register/Signup'
import Signin from './component/Register/Signin'
import Dashboard from './component/Dashboard/Dashboard'
import Passenger from './component/Dashboard/passenger/passenger'
import Driver from './component/Dashboard/driver/driver'
import CreateTrip from './component/Dashboard/driver/CreateTrip'
import SearchTrip from './component/Dashboard/passenger/SearchTrip'
import PassengerTrip from './component/Dashboard/passenger/PassengerTrips'
import Payment from './component/Dashboard/passenger/payment'
import Admin from './component/Admin/Admin'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="passenger" element={<Passenger />} />
            <Route path="driver" element={<Driver />} />
            <Route path="createtrip" element={<CreateTrip />} />
            <Route path="searchtrip" element={<SearchTrip />} />
            <Route path="passengertrip" element={<PassengerTrip />} />
            <Route path="payment" element={<Payment />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
