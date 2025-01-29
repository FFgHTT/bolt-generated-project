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
    return <Hero onGetStarted={() => setShowAuth(true)} />
  }

  return <Layout />
}
