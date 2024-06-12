// import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

function AuthTitle(props: { type?: string }) {
  switch(props.type) {
    case "sign-up": {
      return (
        <>
          <h1 className="text-center font-black text-4xl mb-2">SIGN UP</h1>
          <p className="text-lg">Let assign your information here and become one of our users</p>
        </>
      )
    }

    case "activate-account": {
      return (
        <>
          <h1 className="text-center font-black text-4xl mb-2">ACTIVATE YOUR ACCOUNT</h1>
          <p className="text-lg">You aren't our official user if you don't activate your account</p>
        </>
      )
    }

    case "sign-in":
    default: {
      return (
        <>
          <h1 className="text-center font-black text-4xl mb-2">SIGN IN</h1>
          <p className="text-lg">Do we know you? Let's see</p>
        </>
      )
    }
  }
}

export default function AuthenticationLayout() {
  const location = useLocation();
  const authActionType = location.pathname.slice(1);

  return (
    <div className="flex flex-col justify-center items-center p-4 w-full h-screen">
      <div className="mb-4">
        <AuthTitle type={authActionType} />
      </div>
      <Outlet />
    </div>
  )
}