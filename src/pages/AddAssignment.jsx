import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoDocumentText, IoCreate, IoCloudUpload, IoCheckmark, IoAlert } from 'react-icons/io5';
import DecryptedText from '../components/DecryptedText';
import Buttonn from '../components/Buttonn';

const AddAssignment = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const studentId = localStorage.getItem('studentId');
  const navigate = useNavigate();

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!studentId) {
      navigate('/');
    }
  }, [studentId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      //  const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/students/assignment`, data, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // });
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/students/assignment`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('studentToken')}`, // ✅ Important
          },
        }
      );
      
      setMessage(res.data.message);
      setFormData({ title: '', description: '' });
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add assignment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoDocumentText className="w-6 h-6 text-white" />
          </div>
          <DecryptedText
            className="text-2xl font-semibold text-gray-900"
            text="Add Assignment"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-gray-600 text-sm mt-2">Submit your assignment details</p>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IoDocumentText className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical min-h-[120px]"
            />
            <div className="absolute top-3 right-0 flex items-center pr-3">
              <IoCreate className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white file:font-medium hover:file:bg-blue-700"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IoCloudUpload className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className='flex justify-center'>
            <Buttonn
              type="submit"
              className="w-auto bg-blue-600 text-white py-3 px-6 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Assignment
            </Buttonn>
          </div>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-center font-medium flex items-center justify-center gap-2 ${
              message.includes('failed') || message.includes('upload') || message.includes('logged in')
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-green-50 text-green-800 border border-green-200'
            }`}
          >
            {message.includes('failed') || message.includes('upload') || message.includes('logged in') ? (
              <IoAlert className="w-5 h-5" />
            ) : (
              <IoCheckmark className="w-5 h-5" />
            )}
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAssignment;