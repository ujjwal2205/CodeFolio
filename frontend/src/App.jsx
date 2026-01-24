import React,{useState} from 'react'
import Navbar from './Components/Navbar/Navbar.jsx';
import {Route,Routes} from 'react-router-dom';
function App() {
  const [login,setLogin]=useState(true);
  return (
    <div>
      <Navbar login={login} setLogin={setLogin}/>
    </div>
  )
}

export default App
