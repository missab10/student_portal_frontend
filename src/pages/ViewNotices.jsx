import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bell, AlertTriangle, Clock, Star, Paperclip, Image, Download, Inbox } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';

const ViewNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setError('');
        const res = await axios.get('http://localhost:5000/api/students/notices/all');
        setNotices(res.data.notices || res.data);
      } catch (err) {
        console.error('Error fetching notices:', err);
        setError('Failed to load notices. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="w-14 h-14 bg-blue-600 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-10 bg-blue-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          
          {/* Cards Skeleton */}
          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 animate-pulse">
                <div className="h-6 bg-blue-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="flex gap-3">
                  <div className="h-8 bg-blue-200 rounded-lg w-24"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-28"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Bell className="w-7 h-7 text-white" />
          </div>
          <div style={{ marginTop: '4rem' }}>
            <DecryptedText
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              text="Latest Notices"
              animateOn="view"
              revealDirection="center"
            />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with the latest announcements and important information
          </p>
        </div>

        {notices.length === 0 ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg p-12 shadow-lg border border-gray-200 text-center">
              <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Inbox className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Notices Yet</h3>
              <p className="text-gray-600">
                Check back soon for new announcements and updates!
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {notices.map((notice, index) => (
                <div
                  key={notice._id}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'slideUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Notice Header */}
                  <div className="p-8 pb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
                          {notice.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            <span>Active</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(notice.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Priority Badge */}
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        Important
                      </div>
                    </div>

                    {/* Description */}
                    {notice.description && (
                      <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {notice.description}
                        </p>
                      </div>
                    )}

                    {/* Attachments */}
                    {(notice.image || notice.file) && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                          <Paperclip className="w-4 h-4" />
                          <span>Attachments</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          {notice.image && (
                            <a
                              href={`http://localhost:5000/uploads/notices/${notice.image}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-3 bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-300 rounded-lg px-5 py-3 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                              <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-lg text-white shadow-md group-hover:scale-110 transition-transform duration-200">
                                <Image className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-semibold text-green-700">View Image</div>
                                <div className="text-xs text-green-600">Click to open</div>
                              </div>
                            </a>
                          )}

                          {notice.file && (
                            <a
                              href={`http://localhost:5000/uploads/notices/${notice.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-3 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-300 rounded-lg px-5 py-3 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg text-white shadow-md group-hover:scale-110 transition-transform duration-200">
                                <Download className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-semibold text-blue-700">Download File</div>
                                <div className="text-xs text-blue-600">{notice.file.split('-').pop()}</div>
                              </div>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer with solid color */}
                  <div className="h-2 bg-blue-600"></div>
                </div>
              ))}
            </div>

            {/* Footer Stats */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 bg-white rounded-lg px-6 py-4 shadow-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-gray-800">
                    {notices.length} Active Notice{notices.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="text-sm text-gray-500">
                  Last updated: {notices.length > 0 ? formatDate(notices[0].createdAt) : 'Never'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ViewNotices;