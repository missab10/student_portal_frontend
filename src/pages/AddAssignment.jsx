import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAssignment = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const studentId = localStorage.getItem('studentId');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate studentId
    if (!studentId) {
      setMessage('You must be logged in to submit an assignment');
      navigate('/'); // Redirect to login page
      return;
    }

    // Validate file
    if (!file) {
      setMessage('Please upload a PDF file');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('studentId', studentId);
    data.append('pdf', file);

    try {
      const res = await axios.post('http://localhost:5000/api/students/assignment', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(res.data.message);
      setFormData({ title: '', description: '' });
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add assignment');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/30">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-r from-coral-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-navy-900 mb-2">Add Assignment</h2>
          <p className="text-gray-600 text-sm">Submit your assignment details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="title"
              placeholder="Assignment Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-300 resize-vertical min-h-[100px]"
            />
            <div className="absolute top-3 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-300 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-coral-50 file:text-coral-700 file:font-medium hover:file:bg-coral-100"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 0116 8V4m0 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-coral-500 to-red-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:from-coral-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2"
          >
            Submit Assignment
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-xl text-center font-medium ${
              message.includes('failed') || message.includes('upload') || message.includes('logged in')
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAssignment;