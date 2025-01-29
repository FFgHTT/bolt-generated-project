import React, { useState, useEffect } from 'react'
import { X, Calendar, Clock, AlertCircle, Tag, Bookmark } from 'lucide-react'
import { Button } from '../ui/Button'

export default function TaskModal({ isOpen, onClose, onSave, task = null }) {
  const initialFormData = {
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo', // Default to todo for new tasks
    dueDate: '',
    estimatedTime: '',
    project: '',
    tags: []
  }

  const [formData, setFormData] = useState(initialFormData)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (task) {
      setFormData({
        ...initialFormData,
        ...task
      })
    } else {
      setFormData(initialFormData)
    }
  }, [task, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    if (!formData.title.trim()) {
      setError('Task title is required')
      setIsSubmitting(false)
      return
    }

    try {
      await onSave({
        ...formData,
        status: task ? formData.status : 'todo', // New tasks go to todo
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      onClose()
    } catch (err) {
      setError('Failed to save task. Please try again.')
      console.error('Task save error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Task Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Enter a clear task title"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              placeholder="Add a detailed description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Project
              </label>
              <div className="relative">
                <Bookmark className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none bg-white"
                >
                  <option value="">Select a project</option>
                  <option value="Website Redesign">Website Redesign</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Marketing Campaign">Marketing Campaign</option>
                </select>
              </div>
            </div>

            {/* Priority Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <div className="flex space-x-2">
                {['low', 'medium', 'high'].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority })}
                    className={`flex-1 py-2 px-4 rounded-lg border ${
                      formData.priority === priority
                        ? 'bg-purple-50 border-purple-500 text-purple-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Estimated Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Estimated Hours
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : task ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
