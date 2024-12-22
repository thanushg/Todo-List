import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { CheckCircle2, Circle, Pencil, Trash2, X } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string, description?: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle.trim(), editDescription.trim() || undefined);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-2 p-4 bg-white rounded-lg shadow">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task title"
          autoFocus
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description (optional)"
          rows={2}
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className={`flex items-start space-x-4 p-4 bg-white rounded-lg shadow transition-opacity ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className="mt-1 text-gray-500 hover:text-blue-500 focus:outline-none"
      >
        {todo.completed ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <h3 className={`text-lg font-medium ${
          todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
        }`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className={`mt-1 text-sm ${
            todo.completed ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {todo.description}
          </p>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-400 hover:text-red-500 focus:outline-none"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}