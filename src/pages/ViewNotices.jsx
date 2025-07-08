import { useEffect, useState } from 'react';
import axios from 'axios';
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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:ml-64 transition-all duration-300">
        <div className="w-full max-w-4xl">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-10 bg-white/20 rounded-xl w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-400/50 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          
          {/* Cards Skeleton */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 animate-pulse">
                <div className="h-6 bg-white/20 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-400/50 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-400/50 rounded w-2/3 mb-4"></div>
                <div className="flex gap-3">
                  <div className="h-8 bg-white/20 rounded-xl w-24"></div>
                  <div className="h-8 bg-gray-400/50 rounded-xl w-28"></div>
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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex items-center justify-center p-4 sm:p-6 lg:ml-64 transition-all duration-300">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
            <AlertTriangle className="w-8 h-8 text-red-200" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-4xl">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Bell className="w-7 h-7 text-white" />
          </div>
          <DecryptedText
            className="text-4xl md:text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-blue-200"
            text="Latest Notices"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mt-2 opacity-75">
            Stay updated with the latest announcements and important information
          </p>
        </div>

        {notices.length === 0 ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-white/20 text-center">
              <div className="w-20 h-20 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-500/30">
                <Inbox className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No Notices Yet</h3>
              <p className="text-gray-300">
                Check back soon for new announcements and updates!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {notices.map((notice, index) => (
              <div
                key={notice._id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: 'slideUp 0.6s ease-out forwards'
                }}
              >
                {/* Notice Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 hover:text-blue-300 transition-colors duration-200">
                        {notice.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-400 gap-4">
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
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      Important
                    </div>
                  </div>

                  {/* Description */}
                  {notice.description && (
                    <div className="mb-6">
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {notice.description}
                      </p>
                    </div>
                  )}

                  {/* Attachments */}
                  {(notice.image || notice.file) && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Paperclip className="w-4 h-4" />
                        <span>Attachments</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        {notice.image && (
                          <a
                            href={`http://localhost:5000/uploads/notices/${notice.image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-green-500/20 hover:bg-green-500/30 border-2 border-green-500/30 hover:border-green-500/40 rounded-lg px-5 py-3 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-lg text-white shadow-md group-hover:scale-110 transition-transform duration-200">
                              <Image className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-semibold text-green-300">View Image</div>
                              <div className="text-xs text-green-400">Click to open</div>
                            </div>
                          </a>
                        )}

                        {notice.file && (
                          <a
                            href={`http://localhost:5000/uploads/notices/${notice.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-blue-500/20 hover:bg-blue-500/30 border-2 border-blue-500/30 hover:border-blue-500/40 rounded-lg px-5 py-3 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg text-white shadow-md group-hover:scale-110 transition-transform duration-200">
                              <Download className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-semibold text-blue-300">Download File</div>
                              <div className="text-xs text-blue-400">{notice.file.split('-').pop()}</div>
                            </div>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer with gradient */}
                <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              </div>
            ))}
            
            {/* Footer Stats */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-xl px-6 py-4 shadow-lg border border-white/20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-white">
                    {notices.length} Active Notice{notices.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-400/50"></div>
                <div className="text-sm text-gray-400">
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