import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { User, Mail, Lock, Loader, AlertCircle } from 'lucide-react'
import { signUp } from '../../lib/firebase'
import { useFirebase } from '../../contexts/FirebaseContext'

export default function SignupForm({ onToggleForm }) {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setError: setGlobalError } = useFirebase()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setGlobalError(null)

    try {
      await signUp(email, password)
      // TODO: Store additional user data (name) in Firestore
    } catch (err) {
      setError(
        err.code === 'auth/email-already-in-use'
          ? 'Email already in use'
          : err.code === 'auth/weak-password'
          ? 'Password should be at least 6 characters'
          : 'An error occurred. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center text-red-600">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full name
        </label>
        <div className="mt-1 relative">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
          <User className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1 relative">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
          <Mail className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
          <Lock className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full flex justify-center py-2 px-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>
      </div>

      <div className="text-sm text-center">
        <span className="text-gray-600">Already have an account?</span>{' '}
        <button
          type="button"
          onClick={onToggleForm}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}
