import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/todos', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      // The useEffect hook will handle redirect when user state updates
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-light text-white mb-2">
            Welcome back
          </h2>
          <p className="text-stone-400 text-sm">
            Sign in to continue
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-stone-800 border border-stone-700 text-red-400 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-stone-800 border border-stone-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-stone-500 focus:border-stone-500 transition-colors"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-stone-800 border border-stone-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-stone-500 focus:border-stone-500 transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-white text-stone-900 rounded-md font-medium hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-stone-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-white hover:text-stone-300 transition-colors">
            Sign up
          </Link>
        </p>

        <div className="text-center">
          <Link to="/" className="text-stone-500 hover:text-stone-400 text-sm transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
