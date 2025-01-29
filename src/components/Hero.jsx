import React from 'react'
import { Button } from './ui/Button'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function Hero({ onGetStarted }) {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50" />

      <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-base font-semibold text-purple-600">
                  Introducing TidyCal
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900">Task Management</span>
                  <span className="block text-purple-600">Made Simple</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                The minimalist task management tool designed for freelancers and small teams who want to focus on what matters most.
              </p>
              
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <div className="space-y-4">
                  {[
                    'Drag-and-drop task management',
                    'Built-in time tracking',
                    'Export to PDF for client reports',
                    'Simple, distraction-free interface'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="ml-2 text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <Button size="lg" className="mr-4" onClick={onGetStarted}>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <img
                    className="w-full"
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Team collaboration"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
