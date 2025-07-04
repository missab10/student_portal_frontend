import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



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

  const getFileIcon = (filename) => {
    if (!filename) return '📎';
    const ext = filename.split('.').pop()?.toLowerCase();
    
    const icons = {
      pdf: '📄',
      doc: '📝', docx: '📝',
      xls: '📊', xlsx: '📊',
      ppt: '📺', pptx: '📺',
      zip: '🗜️', rar: '🗜️',
      txt: '📄'
    };
    
    return icons[ext] || '📎';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="w-14 h-14 bg-gradient-to-r from-coral-500 to-red-500 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-10 bg-gradient-to-r from-coral-200 to-red-200 rounded-xl w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          
          {/* Cards Skeleton */}
          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/30 animate-pulse">
                <div className="h-6 bg-gradient-to-r from-coral-200 to-red-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="flex gap-3">
                  <div className="h-8 bg-coral-200 rounded-xl w-24"></div>
                  <div className="h-8 bg-navy-200 rounded-xl w-28"></div>
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/30 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-coral-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-navy-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-coral-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-coral-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 mt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="w-14 h-14 bg-gradient-to-r from-coral-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <span className="text-2xl">📋</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Latest Notices
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with the latest announcements and important information
          </p>
        </div>

        {notices.length === 0 ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-12 shadow-xl border border-gray-200/30 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📭</span>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-3">No Notices Yet</h3>
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
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/30 overflow-hidden transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'slideUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Notice Header */}
                  <div className="p-8 pb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-navy-900 mb-2 hover:text-coral-600 transition-colors duration-200">
                          {notice.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-coral-500 rounded-full animate-pulse"></span>
                            <span>Active</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{formatDate(notice.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Priority Badge */}
                      <div className="bg-gradient-to-r from-coral-500 to-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
                        </svg>
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
                        <div className="flex items-center gap-2 text-sm font-semibold text-navy-800">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <span>Attachments</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          {notice.image && (
                            <a
                              href={`http://localhost:5000/uploads/notices/${notice.image}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-green-200 hover:border-green-300 rounded-xl px-5 py-3 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform duration-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
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
                              className="group flex items-center gap-3 bg-gradient-to-r from-coral-50 to-red-50 hover:from-coral-100 hover:to-red-100 border-2 border-coral-200 hover:border-coral-300 rounded-xl px-5 py-3 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-coral-500 to-red-500 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform duration-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-semibold text-coral-700">Download File</div>
                                <div className="text-xs text-coral-600">{notice.file.split('-').pop()}</div>
                              </div>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer with gradient */}
                  <div className="h-2 bg-gradient-to-r from-coral-500 via-red-500 to-coral-600"></div>
                </div>
              ))}
            </div>

            {/* Footer Stats */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-gray-200/30">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-coral-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-navy-800">
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