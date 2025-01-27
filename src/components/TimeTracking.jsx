import React from 'react'
import { Play, Pause, Clock, Calendar } from 'lucide-react'
import { Button } from './ui/Button'

export default function TimeTracking() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Time Tracking</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            This Week
          </Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      {/* Active Timer */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Current Task</h2>
            <p className="text-gray-500">Website Development - Client A</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-semibold">02:45:30</span>
            <Button size="lg" className="rounded-full w-12 h-12 p-0">
              <Pause className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Time Entries */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Time Entries</h2>
          <div className="space-y-4">
            {[
              { task: 'Content Writing', project: 'Blog', time: '1:30:00', date: 'Today' },
              { task: 'UI Design', project: 'Mobile App', time: '2:45:00', date: 'Today' },
              { task: 'Client Meeting', project: 'Project X', time: '1:00:00', date: 'Yesterday' },
              { task: 'Bug Fixes', project: 'Website', time: '3:15:00', date: 'Yesterday' }
            ].map((entry) => (
              <div key={entry.task} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h3 className="font-medium">{entry.task}</h3>
                    <p className="text-sm text-gray-500">{entry.project}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{entry.time}</p>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
