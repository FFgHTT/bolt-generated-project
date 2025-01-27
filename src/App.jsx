import React from 'react'
import { useFirebase } from './contexts/FirebaseContext'
import Layout from './components/Layout'
import Hero from './components/Hero'
import AuthScreen from './components/auth/AuthScreen'

export default function App() {
  const { user } = useFirebase()
  const [showAuth, setShowAuth] = React.useState(false)

  if (!user) {
    if (showAuth) {
      return <AuthScreen />
    }
    return (
      <div>
        <Hero />
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAuth(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
          >
            Get Started
          </button>
        </div>
      </div>
    )
  }

  return <Layout />
}
