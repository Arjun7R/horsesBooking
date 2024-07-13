import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import BookingForm from './components/BookingForm/BookingForm.jsx'
import PopUp from './components/popUpNotify/PopUp.jsx'
import InviteForm from './components/BookingForm/inviteForm/InviteForm.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/home' element={<App />} />
        <Route path='/bookingForm' element={<BookingForm />} />
      </Route>
    </Routes>
    {/* <InviteForm /> */}
  </React.StrictMode>
  </BrowserRouter>
)
