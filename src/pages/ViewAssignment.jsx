import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, FileText, Edit, Home } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';

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
            <ClipboardList className="w-7 h-7 text-white" />
          </div>

          {/* Example 3: Animate on view (runs once) */}
          <div style={{ marginTop: '4rem' }}>
            <DecryptedText
              className="text-3xl font-bold text-gray-900 mb-2"
              text="Your Assignments"
              animateOn="view"
              revealDirection="center"
            />
          </div>
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
                  <FileText className="w-5 h-5" />
                  View PDF
                </a>
                <p className="text-gray-500 text-sm mt-2">
                  Submitted: {new Date(assignment.createdAt).toLocaleString()}
                </p>
                {assignment.remarks && (
                  <p className="text-green-700 text-sm mt-2 italic">
                    <span className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
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
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignments;