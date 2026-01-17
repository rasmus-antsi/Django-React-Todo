import { useState } from 'react';
import { todoAPI } from '../services/api';

function TodoItem({ todo, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      await todoAPI.update(todo.id, { completed: !todo.completed });
      onUpdate();
    } catch (err) {
      alert('Failed to update todo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this todo?')) {
      return;
    }
    
    setLoading(true);
    try {
      await todoAPI.delete(todo.id);
      onUpdate();
    } catch (err) {
      alert('Failed to delete todo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`group relative p-4 bg-stone-800 border border-stone-700 rounded-md transition-all duration-200 ${
      todo.completed ? 'opacity-60' : 'hover:border-stone-600'
    }`}>
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={loading}
          className="mt-1 w-5 h-5 rounded border-stone-600 bg-stone-800 text-white focus:ring-1 focus:ring-stone-500 cursor-pointer disabled:opacity-50"
        />
        <div className="flex-1 min-w-0">
          <h3 className={`text-white font-medium mb-1 ${
            todo.completed ? 'line-through text-stone-400' : ''
          }`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm ${
              todo.completed ? 'text-stone-500 line-through' : 'text-stone-400'
            }`}>
              {todo.description}
            </p>
          )}
        </div>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="opacity-0 group-hover:opacity-100 text-stone-500 hover:text-red-400 transition-opacity duration-200 disabled:opacity-50 px-2"
          title="Delete"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
