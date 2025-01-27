import React from 'react'
import { Clock, Calendar, BarChart, Star } from 'lucide-react'
import { Button } from './ui/Button'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Active Tasks', value: '12', icon: Star, color: 'text-yellow-500' },
          { title: 'Hours Tracked', value: '32.5', icon: Clock, color: 'text-blue-500' },
          { title: 'Due This Week', value: '8', icon: Calendar, color: 'text-purple-500' },
          { title: 'Completed', value: '24', icon: BarChart, color: 'text-green-500' }
        ].map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Tasks</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Website Redesign', project: 'Client A', time: '2.5h', status: 'In Progress' },
              { title: 'Content Writing', project: 'Blog', time: '1.0h', status: 'Review' },
              { title: 'API Integration', project: 'Client B', time: '4.0h', status: 'In Progress' }
            ].map((task) => (
              <div key={task.title} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.project}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{task.time}</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
