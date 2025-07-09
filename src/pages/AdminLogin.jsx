import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';
import LoginButton from '../components/LoginButton';
import Lottie from "lottie-react";
import admin from "../assets/admin.json";

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
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, formData);
      setMessage(res.data.message);
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin-home');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900/80 to-blue-900/80 flex items-center justify-center transition-all duration-300">

      <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          {/* <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div> */}
                      <div className="mx-auto mb-2 " style={{ width: '150px', height: '150px' }}>
  <Lottie animationData={admin} loop={true} />
</div>
          <DecryptedText
            className="text-3xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-blue-200"
            text="Admin Login"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-blue-200 text-sm mt-2 opacity-75">Sign in to your admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
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
              type="password"
              name="password"
              placeholder="Admin Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex justify-center">
            <LoginButton
              type="submit"
              text="Login"
              className="w-full py-3 rounded-xl font-semibold text-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Login
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
      </div>
    </div>
  );
};

export default AdminLogin;