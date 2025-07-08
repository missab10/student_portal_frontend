import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, FileText, Edit, Home } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ClipboardList className="w-7 h-7 text-white" />
          </div>
          <DecryptedText
            className="text-3xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-blue-200"
            text="Your Assignments"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-blue-200 text-sm mt-2 opacity-75">View all your submitted assignments</p>
        </div>

        {loading ? (
          <p className="text-center text-blue-200 text-sm opacity-75">Loading assignments...</p>
        ) : assignments.length === 0 ? (
          <p className="text-center text-blue-200 text-sm opacity-75">No assignments submitted yet.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map(assignment => (
              <li
                key={assignment._id}
                className="bg-white/5 border border-white/20 rounded-xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{assignment.title}</h3>
                {assignment.description && (
                  <p className="text-gray-300 text-sm mb-3">{assignment.description}</p>
                )}
                <a
                  href={`http://localhost:5000/${assignment.pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm hover:underline transition-colors duration-200"
                >
                  <FileText className="w-5 h-5" />
                  View PDF
                </a>
                <p className="text-gray-400 text-sm mt-2">
                  Submitted: {new Date(assignment.createdAt).toLocaleString()}
                </p>
                {assignment.remarks && (
                  <p className="text-green-300 text-sm mt-2 italic">
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
          <p
            className={`mt-6 p-4 rounded-xl text-center font-medium ${
              message.includes('failed') || message.includes('logged in')
                ? 'bg-red-500/20 text-red-200 border border-red-500/30'
                : 'bg-green-500/20 text-green-200 border border-green-500/30'
            }`}
          >
            {message}
          </p>
        )}
        <div className="mt-8 flex justify-center">
          <Buttonn
            onClick={handleBackToHome}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Buttonn>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignments;