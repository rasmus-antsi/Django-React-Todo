import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-light text-white tracking-tight">
            Todo
          </h1>
          <p className="text-stone-400 text-lg font-light">
            Organize your thoughts, one task at a time
          </p>
        </div>
        
        <div className="space-y-3">
          <Link
            to="/login"
            className="block w-full py-3.5 px-4 bg-white text-stone-900 rounded-md text-center font-medium hover:bg-stone-100 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block w-full py-3.5 px-4 bg-stone-800 text-white border border-stone-700 rounded-md text-center font-medium hover:bg-stone-750 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
