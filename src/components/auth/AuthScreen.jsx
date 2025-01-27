import React, { useState } from 'react'
import AuthLayout from './AuthLayout'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <AuthLayout
      title={isLogin ? 'Sign in to your account' : 'Create your account'}
      subtitle={
        isLogin
          ? 'Enter your details to access your workspace'
          : 'Start managing your tasks efficiently'
      }
    >
      {isLogin ? (
        <LoginForm onToggleForm={() => setIsLogin(false)} />
      ) : (
        <SignupForm onToggleForm={() => setIsLogin(true)} />
      )}
    </AuthLayout>
  )
}
