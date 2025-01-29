import React, { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { Plus, Filter, Search, List, Columns, Loader } from 'lucide-react'
import { Button } from '../ui/Button'
import TaskColumn from './TaskColumn'
import TaskModal from './TaskModal'
import { getUserTasks, updateTask, createTask } from '../../lib/taskService'
import { useFirebase } from '../../contexts/FirebaseContext'

export default function TaskBoard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('board')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const { user } = useFirebase()

  useEffect(() => {
    loadTasks()
  }, [user])

  const loadTasks = async () => {
    if (!user) return
    try {
      const userTasks = await getUserTasks(user.uid)
      setTasks(userTasks || [])
    } catch (error) {
      console.error('Error loading tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData) => {
    try {
      setLoading(true)
      const newTask = await createTask(user.uid, taskData)
      setTasks(prevTasks => [newTask, ...prevTasks])
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditTask = async (taskData) => {
    try {
      await updateTask(editingTask.id, taskData)
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? { ...task, ...taskData } : task
      ))
      setEditingTask(null)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDragEnd = async (result) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result
    const task = tasks.find(t => t.id === draggableId)
    
    if (!task) return

    const updatedTask = {
      ...task,
      status: destination.droppableId
    }

    try {
      await updateTask(draggableId, { status: destination.droppableId })
      setTasks(tasks.map(t => t.id === draggableId ? updatedTask : t))
    } catch (error) {
      console.error('Error updating task status:', error)
    }
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const columns = [
    { 
      id: 'todo', 
      title: 'To Do',
      icon: '📋',
      description: 'Tasks to be started'
    },
    { 
      id: 'in-progress', 
      title: 'In Progress',
      icon: '🔄',
      description: 'Tasks being worked on'
    },
    { 
      id: 'review', 
      title: 'Review',
      icon: '👀',
      description: 'Tasks pending review'
    },
    { 
      id: 'done', 
      title: 'Done',
      icon: '✅',
      description: 'Completed tasks'
    }
  ]

  // Render list view
  const renderListView = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.project}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  task.status === 'todo' ? 'bg-gray-100 text-gray-800' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  task.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditModal(task)}
                  className="text-purple-600 hover:text-purple-900"
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-gray-500">Loading your tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full">
      {/* Header with Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
            <p className="text-gray-500 text-sm mt-1">
              {tasks.length} tasks • {tasks.filter(t => t.status === 'done').length} completed
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Button variant="outline" size="icon" className="!rounded-lg">
              <Filter className="h-5 w-5" />
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-lg shadow-sm">
          <Button
            variant={viewMode === 'board' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('board')}
            className="rounded-r-none border-r"
          >
            <Columns className="h-4 w-4 mr-2" />
            Board
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-l-none"
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'board' ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map(column => (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                icon={column.icon}
                description={column.description}
                tasks={tasks.filter(task => task.status === column.id)}
                onEdit={openEditModal}
                onDelete={() => {}}
                onStartTimer={() => {}}
              />
            ))}
          </div>
        </DragDropContext>
      ) : (
        renderListView()
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTask(null)
        }}
        onSave={editingTask ? handleEditTask : handleCreateTask}
        task={editingTask}
      />
    </div>
  )
}
