import React from 'react'
import SignUp from '../../Components/SignUp/SignUp.jsx'
function SignUpPage({login,setLogin}) {
  return (
    <div>
      <SignUp login={login} setLogin={setLogin}/>
    </div>
  )
}

export default SignUpPage
