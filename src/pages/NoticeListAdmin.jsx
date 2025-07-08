import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, Clock, Image, File, Trash2, Loader, Check, AlertTriangle } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students/notices/all');
      setNotices(res.data);
    } catch (err) {
      setMessage('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/admin/notices/${id}`);
      setNotices(notices.filter((n) => n._id !== id));
      setMessage('Notice deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to delete notice');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 lg:p-10 border border-white/20">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <DecryptedText
            className="text-4xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-white to-blue-200"
            text="All Notices"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-blue-200 text-base mt-2 opacity-75">Manage and review published notices</p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl font-medium text-center animate-fade-in ${
              message.includes('successfully')
                ? 'bg-green-500/20 border border-green-500/30 text-green-200'
                : 'bg-red-500/20 border border-red-500/30 text-red-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {message.includes('successfully') ? (
                <Check className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
              {message}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin h-12 w-12 text-blue-400" />
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-blue-200 text-lg font-medium opacity-75">No notices found.</p>
            <p className="text-gray-400 text-sm mt-2">Published notices will appear here</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <div className="text-sm text-gray-400">
                <span className="font-medium">{notices.length}</span> notice{notices.length !== 1 ? 's' : ''} found
              </div>
            </div>
            
            <div className="grid gap-6">
              {notices.map((notice) => (
                <div
                  key={notice._id}
                  className="bg-white/5 border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <h3 className="text-xl font-semibold text-white">{notice.title}</h3>
                      </div>
                      
                      {notice.description && (
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {notice.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {notice.createdAt ? formatDate(notice.createdAt) : 'Date not available'}
                        </div>
                        
                        {notice.image && (
                          <div className="flex items-center gap-1">
                            <Image className="w-4 h-4" />
                            Has Image
                          </div>
                        )}
                        
                        {notice.file && (
                          <div className="flex items-center gap-1">
                            <File className="w-4 h-4" />
                            Has Attachment
                          </div>
                        )}
                      </div>

                      {(notice.image || notice.file) && (
                        <div className="flex gap-3 mt-4">
                          {notice.image && (
                            <a
                              href={`http://localhost:5000/uploads/notices/${notice.image}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm hover:underline transition-colors duration-200"
                            >
                              <Image className="w-4 h-4" />
                              View Image
                            </a>
                          )}
                          
                          {notice.file && (
                            <a
                              href={`http://localhost:5000/uploads/notices/${notice.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm hover:underline transition-colors duration-200"
                            >
                              <File className="w-4 h-4" />
                              Download File
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(notice._id)}
                      className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200 group"
                      title="Delete Notice"
                    >
                      <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeList;