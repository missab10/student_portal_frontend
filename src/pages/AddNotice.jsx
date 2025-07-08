import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddNotice = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ For redirection

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

      // ✅ Redirect to notice list after 1 second
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6 sm:p-8 lg:p-12">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 lg:p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Add New Notice</h1>
          <p className="text-gray-500 text-base">Create and publish notices for students and faculty</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg font-medium text-center ${
            message.includes('successfully') 
              ? 'bg-green-50 border border-green-200 text-green-600' 
              : 'bg-red-50 border border-red-200 text-red-600'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Notice Title *
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter notice title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-y"
              placeholder="Enter notice description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Upload Image
              </label>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <div className="text-xs text-gray-500 mt-2">
                JPG, PNG, GIF up to 10MB
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Upload File
              </label>
              <input
                id="file-input"
                type="file"
                accept=".pdf,.xlsx,.xls"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <div className="text-xs text-gray-500 mt-2">
                PDF, Excel files only
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={loading || !title}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
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
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
