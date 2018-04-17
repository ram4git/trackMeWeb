import React from 'react'
import { Link } from 'react-router-dom'

const logout = () => {
  const localStorage = window.localStorage;

 try {
     localStorage.removeItem('email');
     localStorage.removeItem('token');

     let arr=[];

     for (var i = 0; i < localStorage.length; i++){
       if (localStorage.key(i).substring(0,8) == 'firebase') {
           arr.push(localStorage.key(i));
       }
     }

     // Iterate over arr and remove the items by key
     for (var i = 0; i < arr.length; i++) {
         localStorage.removeItem(arr[i]);
     }
   } catch (e) {
     // ignore
   }
  window.location.href = '/login';
}

export default function Navbar () {
  return (
    <div className='container navbar'>
      <Link to='/'>Home</Link>
      <nav className='nav-links'>
      <Link to='/jobcards'>Jobcards</Link>
       <Link to='/lorries'>Lorries</Link>
        <Link to='/requests'>Requests</Link>
        <Link to='/settings'>Settings</Link>
        <Link to='/search'>Search</Link>
        <Link to= '/login' onClick={logout} >Logout</Link>
      </nav>
    </div>
  )
}
