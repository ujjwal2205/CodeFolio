import React from 'react'
import Login from '../../Components/Login/Login.jsx'
function LoginPage({login,setLogin}) {
  return (
    <div>
      <Login login={login} setLogin={setLogin}/>
    </div>
  )
}

export default LoginPage
