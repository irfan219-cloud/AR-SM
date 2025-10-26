import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('ar_token')
    if (token) {
      setUser({ token, email: localStorage.getItem('ar_email') })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call
    if (email && password) {
      const token = 'demo_token_' + Date.now()
      localStorage.setItem('ar_token', token)
      localStorage.setItem('ar_email', email)
      setUser({ token, email })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('ar_token')
    localStorage.removeItem('ar_email')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}