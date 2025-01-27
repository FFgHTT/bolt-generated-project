import React from 'react'
import { User, Bell, Shield, CreditCard } from 'lucide-react'
import { Button } from './ui/Button'

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="bg-white shadow rounded-lg divide-y">
        {/* Profile Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <User className="h-6 w-6 text-gray-400" />
              <h2 className="ml-3 text-lg font-medium">Profile</h2>
            </div>
            <Button variant="outline">Edit</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value="John Doe"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value="john@example.com"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CreditCard className="h-6 w-6 text-gray-400" />
              <h2 className="ml-3 text-lg font-medium">Subscription</h2>
            </div>
            <Button>Upgrade Plan</Button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium">Current Plan: Free</p>
            <p className="text-sm text-gray-500 mt-1">5 projects • Basic features</p>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-gray-400" />
            <h2 className="ml-3 text-lg font-medium">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              'Email notifications for task updates',
              'Weekly summary reports',
              'Team mentions and comments',
              'Due date reminders'
            ].map((setting) => (
              <div key={setting} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-gray-700">{setting}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-gray-400" />
              <h2 className="ml-3 text-lg font-medium">Security</h2>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>
          <p className="text-sm text-gray-500">
            Last password change: 3 months ago
          </p>
        </div>
      </div>
    </div>
  )
}
