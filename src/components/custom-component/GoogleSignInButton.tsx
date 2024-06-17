"use client"

import { signIn } from 'next-auth/react'
import React from 'react'

const GoogleSignInButton = () => {

  const googleSignedIn = async () => {
    await signIn('google')
  }
  
  return (

    <div>
      <button className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={googleSignedIn}>
        Sign in with Google
      </button>
    </div>
  )
}

export default GoogleSignInButton