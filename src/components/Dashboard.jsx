import React from 'react'
import { Clock, Calendar, CheckCircle, ArrowRight, BarChart } from 'lucide-react'
import { Button } from './ui/Button'

export default function Dashboard({ onViewTasks }) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="mt-1 text-gray-500">Here's what's happening with your tasks today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={onViewTasks}>
              View All Tasks <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            title: 'Tasks Due Today', 
            value: '5', 
            icon: Calendar,
            color: 'text-blue-500',
            bg: 'bg-blue-50'
          },
          { 
            title: 'Hours Tracked', 
            value: '12.5', 
            icon: Clock,
            color: 'text-purple-500',
            bg: 'bg-purple-50'
          },
          { 
            title: 'Completed Tasks', 
            value: '18', 
            icon: CheckCircle,
            color: 'text-green-500',
            bg: 'bg-green-50'
          },
          { 
            title: 'Weekly Progress', 
            value: '75%', 
            icon: BarChart,
            color: 'text-yellow-500',
            bg: 'bg-yellow-50'
          }
        ].map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6">
            <div className={`${stat.bg} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <h3 className="text-gray-500 text-sm">{stat.title}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Tasks Preview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Tasks</h2>
          <Button variant="outline" size="sm" onClick={onViewTasks}>See All</Button>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Website Redesign', project: 'Client A', status: 'In Progress', dueDate: '2023-12-20' },
            { title: 'Content Writing', project: 'Blog', status: 'Review', dueDate: '2023-12-21' },
            { title: 'API Integration', project: 'Client B', status: 'Todo', dueDate: '2023-12-22' }
          ].map((task) => (
            <div key={task.title} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.project}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  task.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-sm p-6 text-white">
          <h3 className="font-semibold mb-2">Track Time</h3>
          <p className="text-purple-100 mb-4">Start tracking time for your current task</p>
          <Button variant="secondary">Start Timer</Button>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 text-white">
          <h3 className="font-semibold mb-2">Create Task</h3>
          <p className="text-blue-100 mb-4">Quickly add a new task to your board</p>
          <Button variant="secondary" onClick={onViewTasks}>New Task</Button>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-sm p-6 text-white">
          <h3 className="font-semibold mb-2">Generate Report</h3>
          <p className="text-green-100 mb-4">Create a summary of your work</p>
          <Button variant="secondary">Export PDF</Button>
        </div>
      </div>
    </div>
  )
}
