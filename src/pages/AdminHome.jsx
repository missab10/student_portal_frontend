import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, Trash2, Loader, Send } from 'lucide-react';

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

  const handleBackToAdminLogin = () => {
    navigate('/admin-login');
  };
  
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6 sm:p-8 lg:p-12">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 lg:p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">All Submitted Assignments</h1>
          <p className="text-gray-500 text-base">Manage and review student assignments with ease</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin h-12 w-12 text-blue-600" />
          </div>
        ) : assignments.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-medium">No assignments available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((a) => (
              <div
                key={a._id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{a.title}</h3>
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
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline transition-colors duration-200 mb-4"
                >
                  <FileText className="w-5 h-5" />
                  View PDF
                </a>
                <textarea
                  rows={3}
                  placeholder="Add a remark..."
                  value={remarkStates[a._id] || ''}
                  onChange={(e) => handleRemarkChange(a._id, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-y mb-3"
                />
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => submitRemark(a._id)}
                    disabled={submittingRemarks[a._id]}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submittingRemarks[a._id] ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {submittingRemarks[a._id] ? 'Saving...' : 'Save Remark'}
                  </button>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
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
          <div className="mt-8 bg-red-50 border border-red-200 text-red-600 text-center rounded-lg p-4 font-medium">
            {message}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminHome;