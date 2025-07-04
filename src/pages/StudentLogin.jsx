import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/students/login', formData);
      setMessage(res.data.message);
      // Store studentId in localStorage
      localStorage.setItem('studentId', res.data.student.id);
      // Redirect to student home after 1.5 seconds
      setTimeout(() => {
        navigate('/student-home');
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/30">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-r from-coral-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-navy-900 mb-2">Student Login</h2>
          <p className="text-gray-600 text-sm">Sign in to your student account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-coral-500 focus:ring-coral-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-navy-800 hover:text-navy-900 hover:underline transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-coral-500 to-red-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:from-coral-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-xl text-center font-medium ${
              message.includes('failed')
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/register"
            className="text-navy-800 hover:text-navy-900 font-medium hover:underline transition-colors duration-200"
          >
            Don't have an account? <span className="font-semibold">Register here</span>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-gray-500">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-sm">Admin Login</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
<Link to="/admin-login">

<button className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
    <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    </svg>
  </button>
</Link>
  
</div>
        </div>
      </div>
    </div>
  );
};

export default Login;