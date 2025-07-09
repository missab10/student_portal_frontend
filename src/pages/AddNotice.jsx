import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader, Bell, Upload, FileText, Image as ImageIcon, Send } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';
import Buttonn from '../components/Buttonn';  

const AddNotice = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setMessage('Title is required');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);
    if (file) formData.append('file', file);

    try {
      // await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/add`, formData  );
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      
      setMessage('Notice added successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
      setFile(null);
      document.getElementById('image-input').value = '';
      document.getElementById('file-input').value = '';

      setTimeout(() => {
        navigate('/notice-list-admin');
      }, 1000);
    } catch (err) {
      setMessage('Failed to add notice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          <DecryptedText
            className="text-3xl font-bold text-gray-900 mb-2"
            text="Add New Notice"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-gray-600">
            Create and publish notices for students and faculty
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg font-medium text-center ${
                message.includes('successfully')
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notice Title *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter notice title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                placeholder="Enter notice description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
            </div>

            {/* File Upload Section */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-2" />
                  Upload Image
                </label>
                <div className="relative">
                  <input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  <Upload className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG, GIF up to 10MB
                </p>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Upload File
                </label>
                <div className="relative">
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf,.xlsx,.xls"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  <Upload className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  PDF, Excel files only
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Buttonn
                type="submit"
                disabled={loading || !title}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Publish Notice
                  </>
                )}
              </Buttonn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotice;