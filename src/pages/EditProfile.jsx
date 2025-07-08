import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Edit, Loader } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';
import Buttonn from '../components/Buttonn';

const EditProfile = () => {
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    if (!studentId) {
      navigate('/');
      return;
    }

    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/students/${studentId}`);
        setStudent(res.data);
        setFormData({
          fullName: res.data.fullName || '',
          email: res.data.email || '',
          age: res.data.age || '',
          phoneNumber: res.data.phoneNumber || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setMessage('Failed to load profile');
      }
    };

    fetchStudent();
  }, [studentId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords if changing password
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const updateData = {
        fullName: formData.fullName,
        email: formData.email,
        age: formData.age,
        phoneNumber: formData.phoneNumber
      };

      // Add password fields only if changing password
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const res = await axios.put(`http://localhost:5000/api/students/edit-profile/${studentId}`, updateData);
      setMessage(res.data.message);
      
      // Clear password fields after successful update
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Redirect to profile after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex items-center justify-center p-4 sm:p-6 lg:ml-64 transition-all duration-300">
        <Loader className="animate-spin h-12 w-12 text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Edit className="w-8 h-8 text-white" />
          </div>
          <DecryptedText
            className="text-3xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-white to-blue-200"
            text="Edit Profile"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-blue-200 text-sm mt-2 opacity-75">Update your account information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Password Change Section */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Change Password (Optional)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password to change"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
            <Buttonn
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Buttonn>
              <Buttonn
              type="button"
              onClick={() => navigate('/profile')}
              className="flex-1 bg-gray-500/50 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-gray-600/50 transition-all duration-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Cancel
            </Buttonn>
          </div>
          {message && (
            <div
              className={`mt-6 p-4 rounded-xl text-center font-medium ${
                message.includes('failed') || message.includes('error') || message.includes('incorrect') || message.includes('match')
                  ? 'bg-red-500/20 text-red-200 border border-red-500/30'
                  : 'bg-green-500/20 text-green-200 border border-green-500/30'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;