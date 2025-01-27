import React from 'react'
import { Plus, MoreVertical, Folder } from 'lucide-react'
import { Button } from './ui/Button'

export default function ProjectsView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Client Website', tasks: 8, progress: 65 },
          { name: 'Mobile App', tasks: 12, progress: 40 },
          { name: 'Marketing Campaign', tasks: 5, progress: 90 },
          { name: 'Brand Design', tasks: 3, progress: 20 },
          { name: 'Content Strategy', tasks: 6, progress: 55 },
          { name: 'SEO Optimization', tasks: 4, progress: 30 }
        ].map((project) => (
          <div key={project.name} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Folder className="h-8 w-8 text-purple-500" />
                  <div className="ml-3">
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.tasks} tasks</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 rounded-full h-2"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
