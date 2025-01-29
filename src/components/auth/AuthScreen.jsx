import React, { useState } from 'react'
import AuthLayout from './AuthLayout'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ForgotPassword from './ForgotPassword'

export default function AuthScreen() {
  const [view, setView] = useState('login') // 'login', 'signup', or 'forgot-password'

  const renderView = () => {
    switch (view) {
      case 'login':
        return (
          <LoginForm 
            onToggleForm={() => setView('signup')}
            onForgotPassword={() => setView('forgot-password')}
          />
        )
      case 'signup':
        return <SignupForm onToggleForm={() => setView('login')} />
      case 'forgot-password':
        return <ForgotPassword onBack={() => setView('login')} />
      default:
        return null
    }
  }

  return (
    <AuthLayout
      title={
        view === 'login'
          ? 'Sign in to your account'
          : view === 'signup'
          ? 'Create your account'
          : 'Reset your password'
      }
      subtitle={
        view === 'login'
          ? 'Enter your details to access your workspace'
          : view === 'signup'
          ? 'Start managing your tasks efficiently'
          : 'Enter your email to receive reset instructions'
      }
    >
      {renderView()}
    </AuthLayout>
  )
}
