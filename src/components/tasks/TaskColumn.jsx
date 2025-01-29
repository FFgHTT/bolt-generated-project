import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'

export default function TaskColumn({ title, icon, description, tasks, id, onEdit, onDelete, onStartTimer }) {
  const columnColors = {
    todo: 'border-gray-200 bg-gray-50',
    'in-progress': 'border-blue-200 bg-blue-50',
    review: 'border-yellow-200 bg-yellow-50',
    done: 'border-green-200 bg-green-50'
  }

  const columnHeaderColors = {
    todo: 'text-gray-600',
    'in-progress': 'text-blue-600',
    review: 'text-yellow-600',
    done: 'text-green-600'
  }

  return (
    <div className={`rounded-lg border-t-4 ${columnColors[id]} bg-white shadow-sm`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-xl mr-2">{icon}</span>
            <div>
              <h2 className={`font-semibold ${columnHeaderColors[id]}`}>{title}</h2>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <span className="bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-600 shadow-sm">
            {tasks.length}
          </span>
        </div>
        
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-3 min-h-[200px] transition-colors ${
                snapshot.isDraggingOver ? 'bg-gray-50 rounded-lg' : ''
              }`}
            >
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStartTimer={onStartTimer}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}
