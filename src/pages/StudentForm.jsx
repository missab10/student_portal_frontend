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
    <div className="bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080')" }}>
      <div className="min-h-screen bg-gradient-to-b from-slate-900/80 to-blue-900/80 flex items-center justify-center transition-all duration-300">
        <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20">
          <div className="text-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
              <User className="w-5 h-5 text-white" />
            </div>
            <DecryptedText
              className="text-2xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-blue-200"
              text="Student Registration"
              animateOn="view"
              revealDirection="center"
            />
            <p className="text-blue-200 text-xs mt-1 opacity-75">Create your student account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <User className="w-4 h-4 text-gray-400" />
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
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Mail className="w-4 h-4 text-gray-400" />
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
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Calendar className="w-4 h-4 text-gray-400" />
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
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Phone className="w-4 h-4 text-gray-400" />
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
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-3 w-3 text-blue-400 focus:ring-blue-500 border-gray-500 rounded"
                />
                <label htmlFor="remember-me" className="ml-1 text-gray-300">
                  Remember me
                </label>
              </div>
            </div>

            <div className="flex justify-center">
              <LoginButton
                type="submit"
                text="Register"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium text-base shadow-md hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Register
              </LoginButton>
            </div>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
                message.includes('failed')
                  ? 'bg-red-500/20 text-red-200 border border-red-500/30'
                  : 'bg-green-500/20 text-green-200 border border-green-500/30'
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline transition-colors duration-200"
            >
              Already have an account? <span className="font-semibold">Login here</span>
            </Link>
          </div>

          <div className="mt-4 text-center">
            <div className="flex items-center justify-center space-x-3 text-gray-400 text-xs">
              <div className="h-px bg-gray-500/20 flex-1"></div>
              <span>Admin Access</span>
              <div className="h-px bg-gray-500/20 flex-1"></div>
            </div>
            <div className="mt-2">
              <Link to="/admin-login">
                <button className="bg-gray-500/50 text-white px-4 py-1 rounded-lg hover:bg-gray-600/50 transition-colors duration-200 text-sm font-medium">
                  Admin Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;