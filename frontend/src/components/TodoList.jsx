import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { todoAPI } from '../services/api';
import TodoItem from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const data = await todoAPI.getAll();
      setTodos(data);
    } catch (err) {
      alert('Failed to load todos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setSubmitting(true);

    try {
      await todoAPI.create(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (err) {
      alert('Failed to create todo: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-stone-900 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light text-white mb-1">
              Todos
            </h1>
            <p className="text-stone-400 text-sm">
              {totalCount > 0 ? `${completedCount} of ${totalCount} completed` : 'No todos yet'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-stone-400 text-sm">{user?.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-stone-400 hover:text-white border border-stone-700 rounded-md hover:border-stone-600 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={handleSubmit} className="bg-stone-800 border border-stone-700 rounded-md p-6 space-y-4">
          <h2 className="text-lg font-medium text-white">New Todo</h2>
          <div className="space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todo title"
              className="w-full px-4 py-3 bg-stone-900 border border-stone-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-stone-500 focus:border-stone-500 transition-colors placeholder-stone-500"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              rows="3"
              className="w-full px-4 py-3 bg-stone-900 border border-stone-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-stone-500 focus:border-stone-500 transition-colors placeholder-stone-500 resize-none"
            />
            <button
              type="submit"
              disabled={submitting || !title.trim()}
              className="w-full py-3 px-4 bg-white text-stone-900 rounded-md font-medium hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {submitting ? 'Adding...' : 'Add Todo'}
            </button>
          </div>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-stone-500 text-sm">No todos yet. Create one above.</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={fetchTodos}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
