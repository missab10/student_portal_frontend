import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../assets/delete.png';
const AdminHome = () => {
  const [assignments, setAssignments] = useState([]);
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

    const fetchAssignments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/assignments');
        setAssignments(res.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setMessage('Failed to fetch assignments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [isAdmin, navigate]);

  const handleBackToAdminLogin = () => {
    navigate('/admin-login');
  };
  const handleDelete = async (assignmentId) => {
    const confirm = window.confirm('Are you sure you want to delete this assignment?');
    if (!confirm) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/admin/assignments/${assignmentId}`);
      setAssignments(assignments.filter((a) => a._id !== assignmentId));
    } catch (error) {
      alert('Failed to delete assignment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-gray-100 flex flex-col items-center justify-start p-6 sm:p-8 lg:p-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-teal-900 mb-3">All Submitted Assignments</h1>
          <p className="text-gray-500 text-base">Manage and review student assignments with ease</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-600"></div>
          </div>
        ) : assignments.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-medium">No assignments available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((a) => (
              <div
                key={a._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-teal-900 mb-3">{a.title}</h3>
                {a.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{a.description}</p>
                )}
                <div className="text-gray-500 text-sm mb-2">
                  <span className="font-medium">Submitted by:</span>{' '}
                  {a.studentId?.fullName || 'Unknown'} ({a.studentId?.email || '-'})
                </div>
                <div className="text-gray-500 text-sm mb-4">
                  <span className="font-medium">Submitted on:</span>{' '}
                  {new Date(a.createdAt).toLocaleString()}
                </div>
                <a
                  href={`http://localhost:5000/${a.pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm hover:underline transition-colors duration-200 mb-4"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View PDF
                </a>
                <textarea
                  rows={3}
                  placeholder="Add a remark..."
                  defaultValue={a.remarks}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 resize-y"
                  onBlur={async (e) => {
                    const remark = e.target.value;
                    try {
                      await axios.patch(`http://localhost:5000/api/admin/assignments/${a._id}/remark`, {
                        remark
                      });
                      setAssignments((prev) =>
                        prev.map((item) =>
                          item._id === a._id ? { ...item, remarks: remark } : item
                        )
                      );
                    } catch (err) {
                      alert('Failed to save remark');
                    }
                  }}
                />
                <button
                  onClick={() => handleDelete(a._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Assignment"
                >
                  
                  <img className='w-5 h-5' src={deleteIcon} alt="delete" />
                </button>
              </div>
            ))}
          </div>
        )}
        {message && (
          <div className="mt-8 bg-red-50 border border-red-200 text-red-600 text-center rounded-lg p-4 font-medium">
            {message}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminHome;