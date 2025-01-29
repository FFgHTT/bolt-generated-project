import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { Mail, Loader, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react'
import { resetPassword } from '../../lib/firebase'
import AuthLayout from './AuthLayout'

export default function ForgotPassword({ onBack }) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(
        err.code === 'auth/user-not-found'
          ? 'No account found with this email'
          : 'An error occurred. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">
              Reset link sent! Check your email for instructions.
            </span>
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
          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              'Send reset link'
            )}
          </Button>
        </div>

        <div className="text-sm text-center">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center font-medium text-purple-600 hover:text-purple-500"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to sign in
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
