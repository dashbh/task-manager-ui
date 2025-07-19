import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginForm from '../components/LoginForm'

const validUsers = [
  { username: 'admin', password: 'admin123' },
  { username: 'demo', password: 'demo123' },
  { username: 'user', password: 'password' },
]

export default function Login() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true)
    setError('')

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const validUser = validUsers.find(
      (user) => user.username === username && user.password === password,
    )

    if (validUser) {
      localStorage.setItem('token', 'fake-jwt-token')
      localStorage.setItem('user', JSON.stringify({ username }))
      navigate('/dashboard')
    } else {
      setError('Invalid username or password')
    }

    setIsLoading(false)
  }

  return (
    <LoginForm onSubmit={handleLogin} error={error} isLoading={isLoading} />
  )
}
