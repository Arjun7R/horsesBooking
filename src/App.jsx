import React, { useState } from 'react'
import BookingForm from './components/BookingForm/BookingForm'
import TempForm from './components/TempForm'
import LandigPage from './pages/landingPage/LandigPage'
import { Outlet } from 'react-router-dom';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className='app-container'>
      <LandigPage isBooking={isBookingOpen} />
      <Outlet />
    </div>
  )
}

export default App