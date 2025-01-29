import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { Mail, Lock, Loader, AlertCircle } from 'lucide-react'
import { signIn } from '../../lib/firebase'
import { useFirebase } from '../../contexts/FirebaseContext'

export default function LoginForm({ onToggleForm, onForgotPassword }) {
  const [isLoading, setIsLoading] = useState(false)
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
      console.log('Submitting login form...', { email }); // Debug log
      await signIn(email, password)
      console.log('Login successful'); // Debug log
    } catch (err) {
      console.error('Login error:', err); // Debug log
      
      // More specific error messages
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email address format.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        default:
          setError(`Error: ${err.message}`);
      }
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <button
            type="button"
            onClick={onForgotPassword}
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Forgot password?
          </button>
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
            'Sign in'
          )}
        </Button>
      </div>

      <div className="text-sm text-center">
        <span className="text-gray-600">Don't have an account?</span>{' '}
        <button
          type="button"
          onClick={onToggleForm}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          Sign up
        </button>
      </div>
    </form>
  )
}
