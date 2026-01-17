import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(username, password1, password2);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-light text-white mb-2">
            Create account
          </h2>
          <p className="text-stone-400 text-sm">
            Start organizing your tasks
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
              placeholder="Choose a username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-300">
              Password
            </label>
            <input
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
              className="w-full px-4 py-3 bg-stone-800 border border-stone-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-stone-500 focus:border-stone-500 transition-colors"
              placeholder="Create a password"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              className="w-full px-4 py-3 bg-stone-800 border border-stone-700 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-stone-500 focus:border-stone-500 transition-colors"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-white text-stone-900 rounded-md font-medium hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-stone-400">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:text-stone-300 transition-colors">
            Sign in
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

export default Register;
