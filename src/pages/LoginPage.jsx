import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <GoogleOAuthProvider clientId="203045752998-bdh6u4efmkdsm02efb4gvph9rqaq1eo8.apps.googleusercontent.com">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mb-6 font-bold">WebScraper Portal</h1>
        <GoogleLogin
          onSuccess={cred => {
            localStorage.setItem("user", JSON.stringify(cred))
            navigate('/dashboard')
          }}
          onError={() => console.log("Login Failed")}
        />
      </div>
    </GoogleOAuthProvider>
  )
}
