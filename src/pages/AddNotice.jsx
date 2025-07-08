import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader, Bell } from 'lucide-react';
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
      await axios.post('http://localhost:5000/api/admin/add', formData);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-10 border border-white/20">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <DecryptedText
            className="text-4xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-white to-blue-200"
            text="Add New Notice"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-blue-200 text-base mt-2 opacity-75">Create and publish notices for students and faculty</p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl font-medium text-center ${
              message.includes('successfully')
                ? 'bg-green-500/20 border border-green-500/30 text-green-200'
                : 'bg-red-500/20 border border-red-500/30 text-red-200'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Notice Title *
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter notice title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-y"
              placeholder="Enter notice description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Upload Image
              </label>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-400 transition-all duration-300"
              />
              <div className="text-xs text-gray-400 mt-2">
                JPG, PNG, GIF up to 10MB
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Upload File
              </label>
              <input
                id="file-input"
                type="file"
                accept=".pdf,.xlsx,.xls"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-400 transition-all duration-300"
              />
              <div className="text-xs text-gray-400 mt-2">
                PDF, Excel files only
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Buttonn
              type="submit"
              disabled={loading || !title}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:bg-gray-500/50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Publish Notice
                </>
              )}
            </Buttonn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;