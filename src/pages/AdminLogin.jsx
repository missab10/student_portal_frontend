import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, formData)
      setMessage(res.data.message);
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin-home');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded text-base outline-none transition-colors focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="password"
              placeholder="Admin Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded text-base outline-none transition-colors focus:border-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full p-3 bg-blue-600 text-white rounded text-base font-medium cursor-pointer transition-colors hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-red-600 text-sm">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;