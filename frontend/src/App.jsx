import React from 'react'
import {ToastContainer} from 'react-toastify';
import Navbar from './Components/Navbar/Navbar.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import AboutUsPage from './Pages/AboutUsPage/AboutUsPage.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import ForgotPasswordPage from './Pages/ForgotPasswordPage/ForgotPasswordPage.jsx';
import SignUpPage from './Pages/SignUpPage/SignUpPage.jsx';
import DashboardPage from './Pages/DashboardPage/DashboardPage.jsx';
import LeaderboardPage from './Pages/LeaderboardPage/LeaderboardPage.jsx';
import FriendsPage from './Pages/FriendsPage/FriendsPage.jsx';
import EditPage from './Pages/EditPage/EditPage.jsx';
import CardPage from './Pages/CardPage/CardPage.jsx';
import {Route,Routes} from 'react-router-dom';
import Footer from './Components/Footer/Footer.jsx';
function App() {
  return (
    <div>
    <ToastContainer/>
      <Navbar />
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutUsPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/dashboard/:userName' element={<DashboardPage/>}/>
      <Route path='/leaderboard' element={<LeaderboardPage/>}/>
      <Route path="/friends" element={<FriendsPage/>}/>
      <Route path="/edit" element={<EditPage/>}/>
      <Route path="/card/:userName" element={<CardPage/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
