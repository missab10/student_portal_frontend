import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const studentId = localStorage.getItem('studentId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!studentId) {
        setMessage('You must be logged in to view assignments');
        navigate('/');
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5000/api/students/assignments/${studentId}`);
        setAssignments(res.data);
      } catch (error) {
        console.error('Error fetching assignments:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
        setMessage(error.response?.data?.message || 'Failed to fetch assignments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [studentId, navigate]);

  const handleBackToHome = () => {
    navigate('/student-home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Assignments</h2>
          <p className="text-gray-600 text-sm">View all your submitted assignments</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 text-sm">Loading assignments...</p>
        ) : assignments.length === 0 ? (
          <p className="text-center text-gray-600 text-sm">No assignments submitted yet.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map(assignment => (
              <li
                key={assignment._id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">{assignment.title}</h3>
                {assignment.description && (
                  <p className="text-gray-600 text-sm mb-3">{assignment.description}</p>
                )}
                <a
                  href={`http://localhost:5000/${assignment.pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View PDF
                </a>
                <p className="text-gray-500 text-sm mt-2">
                  Submitted: {new Date(assignment.createdAt).toLocaleString()}
                </p>
                {assignment.remarks && (
                  <p className="text-green-700 text-sm mt-2 italic">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Remark: {assignment.remarks}
                    </span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
        {message && (
          <p className="mt-6 text-center text-red-500 text-sm font-medium bg-red-50 border border-red-200 rounded-lg p-4">
            {message}
          </p>
        )}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleBackToHome}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignments;