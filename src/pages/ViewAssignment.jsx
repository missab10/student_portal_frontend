import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoClipboard, IoDocumentText, IoCreate, IoHome, IoCheckmarkCircle, IoAlertCircle } from 'react-icons/io5';
import DecryptedText from '../components/DecryptedText';
import Buttonn from '../components/Buttonn';

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
        // const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/students/assignments/${studentId}`);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/students/assignments/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('studentToken')}`, // ✅ send token
            },
          }
        );
        
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoClipboard className="w-6 h-6 text-white" />
          </div>
          <DecryptedText
            className="text-2xl font-semibold text-gray-900"
            text="Your Assignments"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-gray-600 text-sm mt-2">View all your submitted assignments</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 text-sm">Loading assignments...</p>
        ) : assignments.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">No assignments submitted yet.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map(assignment => (
              <li
                key={assignment._id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{assignment.title}</h3>
                {assignment.description && (
                  <p className="text-gray-700 text-sm mb-3">{assignment.description}</p>
                )}
                <a
                  href={`http://localhost:5000/${assignment.pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline transition-colors duration-200"
                >
                  <IoDocumentText className="w-5 h-5" />
                  View PDF
                </a>
                <p className="text-gray-500 text-sm mt-2">
                  Submitted: {new Date(assignment.createdAt).toLocaleString()}
                </p>
                {assignment.remarks && (
                  <p className="text-green-700 text-sm mt-2">
                    <span className="flex items-center gap-2">
                      <IoCreate className="w-4 h-4" />
                      Remark: {assignment.remarks}
                    </span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-center font-medium flex items-center justify-center gap-2 ${
              message.includes('failed') || message.includes('logged in')
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-green-50 text-green-800 border border-green-200'
            }`}
          >
            {message.includes('failed') || message.includes('logged in') ? (
              <IoAlertCircle className="w-5 h-5" />
            ) : (
              <IoCheckmarkCircle className="w-5 h-5" />
            )}
            {message}
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <Buttonn
            onClick={handleBackToHome}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <IoHome className="w-5 h-5" />
            Back to Home
          </Buttonn>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignments;