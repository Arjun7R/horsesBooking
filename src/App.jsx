import React, { useState } from 'react'
import LandigPage from './components/landingPage/LandigPage';
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