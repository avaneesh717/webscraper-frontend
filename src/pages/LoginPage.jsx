import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <GoogleOAuthProvider clientId="203045752998-pps1optsmh8dgbht24rmn14vqupdl24j.apps.googleusercontent.com">
      <div className="min-h-screen mesh-gradient flex items-center justify-center p-4">
        <div className="glass p-10 rounded-3xl w-full max-w-md border-glow animate-stagger-fade-in relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 shadow-inner">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-glow">
              Scraper<span className="text-primary">Portal</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-10">
              High-performance web intelligence
            </p>

            <div className="flex justify-center bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors duration-300">
              <GoogleLogin
                theme="filled_black"
                shape="pill"
                onSuccess={cred => {
                  localStorage.setItem("user", JSON.stringify(cred))
                  navigate('/dashboard')
                }}
                onError={() => console.log("Login Failed")}
              />
            </div>
            
            <p className="mt-8 text-sm text-muted-foreground/60 italic">
              Experience the next generation of data extraction
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}
