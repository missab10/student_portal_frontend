import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoShield, IoTrash, IoReload, IoChevronBack } from 'react-icons/io5';
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
        // const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
          }
        );
        
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
      // await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}`);
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      alert('Failed to delete user');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-sm border border-gray-200 p-8 lg:p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoShield className="w-8 h-8 text-white" />
          </div>
          <DecryptedText
            className="text-3xl font-semibold text-gray-900"
            text="Registered Students"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-gray-600 text-base mt-2">View all registered students</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <IoReload className="animate-spin h-12 w-12 text-blue-600" />
          </div>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-medium">No users found.</p>
        ) : (
          <>
            {/* Mobile: Card Layout */}
            <div className="md:hidden grid gap-6">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{user.fullName}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    <span className="font-medium">Registered:</span>{' '}
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    title="Delete User"
                  >
                    <IoTrash className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            {/* Desktop: Table Layout */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full table-auto border border-gray-200 rounded-lg">
                <thead className="bg-gray-50 text-gray-700 font-semibold">
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
                      className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="p-4 text-gray-900">{user.fullName}</td>
                      <td className="p-4 text-gray-600">{user.email}</td>
                      <td className="p-4 text-gray-600">{new Date(user.createdAt).toLocaleString()}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          title="Delete User"
                        >
                          <IoTrash className="w-5 h-5" />
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
          <div className="mt-8 bg-red-50 border border-red-200 text-red-800 text-center rounded-lg p-4 font-medium">
            {message}
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <Buttonn
            onClick={handleBackToAdminHome}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-8 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <IoChevronBack className="w-5 h-5" />
            Back to Admin Home
          </Buttonn>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;