import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../assets/delete.png';
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6 sm:p-8 lg:p-12">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 lg:p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Registered Students</h1>
          <p className="text-gray-500 text-base">View all registered students</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
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
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{user.fullName}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Registered:</span>{' '}
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            {/* Desktop: Table Layout */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full table-auto border border-gray-200 rounded-lg">
                <thead className="bg-blue-100 text-blue-900 font-semibold">
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
                      className="border-t border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="p-4">{user.fullName}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{new Date(user.createdAt).toLocaleString()}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete User"
                        >
                          <img className='w-5 h-5 hover:scale-110 transition-transform duration-200 cursor-pointer' src={deleteIcon} alt="delete" />
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
          <div className="mt-8 bg-red-50 border border-red-200 text-red-600 text-center rounded-lg p-4 font-medium">
            {message}
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleBackToAdminHome}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Admin Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;