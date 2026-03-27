import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setSuccess('Login success! Redirecting...');
      
      setTimeout(() => {
        navigate('/'); // Redirect to a protected page/dashboard
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-blue-900 p-6 font-sans">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-2xl flex flex-col text-white">
        <h1 className="text-3xl font-bold mb-2 text-center bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">Log in to your account to continue</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-3 rounded-xl mb-6 text-sm text-center">
            {success}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <input 
              type="email" 
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required 
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:bg-black/40 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input 
              type="password" 
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required 
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:bg-black/40 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 w-full py-3.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-10px_rgba(139,92,246,0.5)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
