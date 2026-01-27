import React,{useState} from 'react'
import {ToastContainer} from 'react-toastify';
import Navbar from './Components/Navbar/Navbar.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import AboutUsPage from './Pages/AboutUsPage/AboutUsPage.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import {Route,Routes} from 'react-router-dom';
import Footer from './Components/Footer/Footer.jsx';
function App() {
  const [login,setLogin]=useState(true);
  return (
    <div>
    <ToastContainer/>
      <Navbar login={login} setLogin={setLogin}/>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutUsPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
