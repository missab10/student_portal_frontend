import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Calendar, Phone, Lock } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';
import LoginButton from '../components/LoginButton';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    phoneNumber: '',
    password: ''
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/students', formData);
      setMessage(res.data.message);
      setFormData({
        fullName: '',
        email: '',
        age: '',
        phoneNumber: '',
        password: ''
      });
      setTimeout(() => {
        navigate('/'); // redirect to login after 1.5 seconds
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex items-center justify-center p-4 sm:p-6 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-7 h-7 text-white" />
          </div>
          <DecryptedText
            className="text-3xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-blue-200"
            text="Student Registration"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-blue-200 text-sm mt-2 opacity-75">Create your student account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <User className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Phone className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-400 focus:ring-blue-500 border-gray-500 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center">
            <LoginButton
              type="submit"
              text="Register"
              className="w-full py-3 rounded-xl font-semibold text-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Register
            </LoginButton>
          </div>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-xl text-center font-medium ${
              message.includes('failed')
                ? 'bg-red-500/20 text-red-200 border border-red-500/30'
                : 'bg-green-500/20 text-green-200 border border-green-500/30'
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
          >
            Already have an account? <span className="font-semibold">Login here</span>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-gray-400">
            <div className="h-px bg-gray-500/20 flex-1"></div>
            <span className="text-sm">Admin Access</span>
            <div className="h-px bg-gray-500/20 flex-1"></div>
          </div>
          <div className="mt-4">
            <Link to="/admin-login">
              <button className="bg-gray-500/50 text-white px-6 py-2 rounded-xl hover:bg-gray-600/50 transition-colors duration-200 font-medium">
                Admin Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;