import React from 'react'
import { Clock, Calendar, MoreVertical } from 'lucide-react'
import { Button } from '../ui/Button'
import { Draggable } from 'react-beautiful-dnd'

export default function TaskCard({ task, index, onEdit, onDelete, onStartTimer }) {
  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all ${
            snapshot.isDragging ? 'shadow-lg ring-2 ring-purple-500 ring-opacity-50' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-gray-900">{task.title}</h3>
              {task.project && (
                <span className="text-xs text-gray-500">{task.project}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onStartTimer(task)}
              >
                <Clock className="h-4 w-4 text-gray-500" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onEdit(task)}
              >
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{task.description}</p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs border ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              {task.estimatedTime && (
                <span className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {task.estimatedTime}h
                </span>
              )}
            </div>
            {task.dueDate && (
              <span className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}
