import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, Trash2, Loader, Send } from 'lucide-react';
import Buttonn from '../components/Buttonn';
import DecryptedText from '../components/DecryptedText';

const AdminHome = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [remarkStates, setRemarkStates] = useState({});
  const [submittingRemarks, setSubmittingRemarks] = useState({});
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
        
        // Initialize remark states
        const initialRemarkStates = {};
        res.data.forEach(assignment => {
          initialRemarkStates[assignment._id] = assignment.remarks || '';
        });
        setRemarkStates(initialRemarkStates);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setMessage('Failed to fetch assignments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [isAdmin, navigate]);

  const handleDelete = async (assignmentId) => {
    const confirm = window.confirm('Are you sure you want to delete this assignment?');
    if (!confirm) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/admin/assignments/${assignmentId}`);
      setAssignments(assignments.filter((a) => a._id !== assignmentId));
      // Clean up remark states
      const newRemarkStates = { ...remarkStates };
      delete newRemarkStates[assignmentId];
      setRemarkStates(newRemarkStates);
    } catch (error) {
      alert('Failed to delete assignment');
    }
  };

  const handleRemarkChange = (assignmentId, value) => {
    setRemarkStates(prev => ({
      ...prev,
      [assignmentId]: value
    }));
  };

  const submitRemark = async (assignmentId) => {
    const remark = remarkStates[assignmentId] || '';
    
    setSubmittingRemarks(prev => ({
      ...prev,
      [assignmentId]: true
    }));

    try {
      await axios.patch(`http://localhost:5000/api/admin/assignments/${assignmentId}/remark`, {
        remark
      });
      
      setAssignments((prev) =>
        prev.map((item) =>
          item._id === assignmentId ? { ...item, remarks: remark } : item
        )
      );
      
      // Show success feedback
      alert('Remark saved successfully!');
    } catch (err) {
      alert('Failed to save remark');
    } finally {
      setSubmittingRemarks(prev => ({
        ...prev,
        [assignmentId]: false
      }));
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
            text="All Submitted Assignments"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-blue-200 text-base mt-2 opacity-75">Manage and review student assignments with ease</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin h-12 w-12 text-blue-400" />
          </div>
        ) : assignments.length === 0 ? (
          <p className="text-center text-blue-200 text-lg font-medium opacity-75">No assignments available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((a) => (
              <div
                key={a._id}
                className="bg-white/5 border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{a.title}</h3>
                {a.description && (
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{a.description}</p>
                )}
                <div className="text-gray-400 text-sm mb-2">
                  <span className="font-medium">Submitted by:</span>{' '}
                  {a.studentId?.fullName || 'Unknown'} ({a.studentId?.email || '-'})
                </div>
                <div className="text-gray-400 text-sm mb-4">
                  <span className="font-medium">Submitted on:</span>{' '}
                  {new Date(a.createdAt).toLocaleString()}
                </div>
                <a
                  href={`http://localhost:5000/${a.pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm hover:underline transition-colors duration-200 mb-4"
                >
                  <FileText className="w-5 h-5" />
                  View PDF
                </a>
                <textarea
                  rows={3}
                  placeholder="Add a remark..."
                  value={remarkStates[a._id] || ''}
                  onChange={(e) => handleRemarkChange(a._id, e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-y mb-3"
                />
                <div className="flex items-center justify-between">
                  <Buttonn
                    onClick={() => submitRemark(a._id)}
                    disabled={submittingRemarks[a._id]}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-green-500 hover:to-green-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    {submittingRemarks[a._id] ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {submittingRemarks[a._id] ? 'Saving...' : 'Save Remark'}
                  </Buttonn>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    title="Delete Assignment"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {message && (
          <div className="mt-8 bg-red-500/20 border border-red-500/30 text-red-200 text-center rounded-xl p-4 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;