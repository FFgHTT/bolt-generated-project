import React from 'react'
import { Home, Folder, Clock, Settings, LogOut, Layout as LayoutIcon } from 'lucide-react'
import { Button } from './ui/Button'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import TaskBoard from './tasks/TaskBoard'
import ProjectsView from './ProjectsView'
import TimeTracking from './TimeTracking'
import SettingsComponent from './Settings'

export default function Layout() {
  const [currentView, setCurrentView] = React.useState('dashboard')
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: LayoutIcon, label: 'Tasks', id: 'tasks' },
    { icon: Folder, label: 'Projects', id: 'projects' },
    { icon: Clock, label: 'Time Tracking', id: 'time-tracking' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ]

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewTasks={() => setCurrentView('tasks')} />
      case 'tasks':
        return <TaskBoard />
      case 'projects':
        return <ProjectsView />
      case 'time-tracking':
        return <TimeTracking />
      case 'settings':
        return <SettingsComponent />
      default:
        return <Dashboard onViewTasks={() => setCurrentView('tasks')} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} menuItems={menuItems} />
      
      <div className="flex">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 mt-16 pt-5 bg-white border-r">
          <div className="flex-1 flex flex-col">
            <nav className="flex-1 px-4 space-y-1">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setCurrentView(item.id)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              ))}
            </nav>
            <div className="p-4">
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={() => window.location.reload()} // Temporary logout for demo
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 mt-16">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  )
}
