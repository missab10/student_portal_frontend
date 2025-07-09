import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Bell, Clock, Image, File, Trash2, Loader, Check, AlertTriangle
} from 'lucide-react';
import DecryptedText from '../components/DecryptedText';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const isAdmin = localStorage.getItem('isAdmin');

    if (!token || isAdmin !== 'true') {
      setMessage('Unauthorized access. Admin only.');
      setLoading(false);
      return;
    }

    const fetchNotices = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/notices/all/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotices(res.data);
      } catch (err) {
        setMessage('Failed to load notices');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/notices/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setNotices(notices.filter((n) => n._id !== id));
      setMessage('Notice deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to delete notice');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-6 sm:p-10 border border-gray-200">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-blue-600" />
          </div>
          <DecryptedText
            className="text-3xl font-bold text-gray-800"
            text="All Notices"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-sm text-gray-500 mt-1">Manage and review published notices</p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-center font-medium transition ${
              message.includes('successfully')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-600'
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

        {/* Unauthorized */}
        {message === 'Unauthorized access. Admin only.' ? null : loading ? (
          <div className="flex justify-center py-10">
            <Loader className="animate-spin h-10 w-10 text-blue-500" />
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center py-10">
            <Bell className="w-10 h-10 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg font-medium">No notices found</p>
            <p className="text-sm text-gray-400 mt-1">Published notices will appear here</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-sm text-gray-500 border-b pb-4">
              <span className="font-semibold">{notices.length}</span> notice{notices.length !== 1 ? 's' : ''} found
            </div>

            {notices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
                    </div>

                    {notice.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {notice.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(notice.createdAt)}
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
                          Has File
                        </div>
                      )}
                    </div>

                    {(notice.image || notice.file) && (
                      <div className="flex gap-4 mt-3 text-sm font-medium">
                        {notice.image && (
                          <a
                            href={`${import.meta.env.VITE_API_BASE_URL}/uploads/notices/${notice.image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <Image className="w-4 h-4" />
                            View Image
                          </a>
                        )}
                        {notice.file && (
                          <a
                            href={`${import.meta.env.VITE_API_BASE_URL}/uploads/notices/${notice.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
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
                    title="Delete Notice"
                    className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeList;
