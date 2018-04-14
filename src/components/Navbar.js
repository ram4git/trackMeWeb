import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar () {
  return (
    <div className='container navbar'>
      <Link to='/'>Home</Link>
      <nav className='nav-links'>
       <Link to='/lorries'>Lorries</Link>
        <Link to='/requests'>Requests</Link>
        <Link to='/settings'>Settings</Link>
        <Link to='/search'>Search</Link>
      </nav>
    </div>
  )
}
