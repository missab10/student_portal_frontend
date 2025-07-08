import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Shield, Trash2, Loader } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';
import Buttonn from '../components/Buttonn';
const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin');

  useEffect(() => {
    if (!isAdmin) {
      setMessage('You must be logged in as an admin to view this page');
      navigate('/admin-login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users');
        setUsers(res.data);
        setMessage('');
      } catch (error) {
        console.error('Failed to fetch users:', error);
        if (error.response) {
          setMessage(error.response.data.message || 'Failed to fetch users');
        } else {
          setMessage('Network error: Unable to connect to the server');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAdmin, navigate]);

  const handleBackToAdminHome = () => {
    navigate('/admin-home');
  };
  
  const handleDelete = async (userId) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      alert('Failed to delete user');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-10 border border-white/20">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <DecryptedText
            className="text-4xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-white to-blue-200"
            text="Registered Students"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-blue-200 text-base mt-2 opacity-75">View all registered students</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin h-12 w-12 text-blue-400" />
          </div>
        ) : users.length === 0 ? (
          <p className="text-center text-blue-200 text-lg font-medium opacity-75">No users found.</p>
        ) : (
          <>
            {/* Mobile: Card Layout */}
            <div className="md:hidden grid gap-6">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white/5 border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{user.fullName}</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-300 text-sm mb-4">
                    <span className="font-medium">Registered:</span>{' '}
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-400 hover:text-red-300 hover:scale-110 transition-all duration-200"
                    title="Delete User"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            {/* Desktop: Table Layout */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full table-auto border border-white/20 rounded-xl">
                <thead className="bg-white/10 text-blue-200 font-semibold">
                  <tr>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Registered On</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-white/20 hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="p-4 text-white">{user.fullName}</td>
                      <td className="p-4 text-gray-300">{user.email}</td>
                      <td className="p-4 text-gray-300">{new Date(user.createdAt).toLocaleString()}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-400 hover:text-red-300 hover:scale-110 transition-all duration-200"
                          title="Delete User"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {message && (
          <div className="mt-8 bg-red-500/20 border border-red-500/30 text-red-200 text-center rounded-xl p-4 font-medium">
            {message}
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <Buttonn
            onClick={handleBackToAdminHome}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Admin Home
          </Buttonn>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;