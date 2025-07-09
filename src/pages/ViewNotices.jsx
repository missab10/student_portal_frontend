// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bell, AlertTriangle, Clock, Star, Paperclip, Image, Download, Inbox } from 'lucide-react';
// import DecryptedText from '../components/DecryptedText';
// import { useNavigate } from 'react-router-dom';

// const ViewNotices = () => {
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // ✅ Navigation hook

//   useEffect(() => {
//     const fetchNotices = async () => {
//       const token = localStorage.getItem('studentToken');

//       // ✅ Redirect if not logged in
//       if (!token) {
//         navigate('/'); // or '/student-login' if you have a separate route
//         return;
//       }

//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/api/students/notices/all`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setNotices(res.data.notices || res.data);
//       } catch (err) {
//         console.error('Error fetching notices:', err);

//         // ✅ If unauthorized, force logout and redirect
//         if (err.response?.status === 401 || err.response?.status === 403) {
//           localStorage.removeItem('studentToken');
//           navigate('/');
//         } else {
//           setError('Failed to load notices. Please try again.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotices();
//   }, [navigate]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 1) return 'Today';
//     if (diffDays === 2) return 'Yesterday';
//     if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen  bg-gray-50 flex items-center justify-center p-6">
//         <div className="w-full max-w-4xl">
//           {/* Header Skeleton */}
//           <div className="text-center mb-8">
//             <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-4 animate-pulse"></div>
//             <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-2 animate-pulse"></div>
//             <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
//           </div>
          
//           {/* Cards Skeleton */}
//           <div className="space-y-4">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
//                 <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
//                 <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
//                 <div className="flex gap-2">
//                   <div className="h-6 bg-gray-300 rounded w-20"></div>
//                   <div className="h-6 bg-gray-200 rounded w-24"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="bg-white rounded-lg border border-red-200 p-8 text-center max-w-md w-full">
//           <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//             <AlertTriangle className="w-6 h-6 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Notices</h3>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen  bg-gray-50 p-6">
//       <div className="w-full max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="w-12 h-12  bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//             <Bell className="w-6 h-6 text-blue-600" />
//           </div>
//           <DecryptedText
//             className="text-3xl font-bold text-gray-900 mb-2"
//             text="Notices"
//             animateOn="view"
//             revealDirection="center"
//           />
//           <p className="text-gray-600">
//             Stay updated with important announcements
//           </p>
//         </div>

//         {notices.length === 0 ? (
//           <div className="max-w-md mx-auto">
//             <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
//               <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                 <Inbox className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notices Available</h3>
//               <p className="text-gray-600">
//                 Check back later for new announcements
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {notices.map((notice, index) => (
//               <div
//                 key={notice._id}
//                 className=" bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
//                 style={{
//                   animationDelay: `${index * 100}ms`,
//                   animation: 'fadeIn 0.5s ease-out forwards'
//                 }}
//               >
//                 {/* Notice Header */}
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex-1">
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                         {notice.title}
//                       </h3>
//                       <div className="flex items-center text-sm text-gray-500 gap-4">
//                         <div className="flex items-center gap-1">
//                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                           <span>Active</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" />
//                           <span>{formatDate(notice.createdAt)}</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Priority Badge */}
//                     <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
//                       <Star className="w-3 h-3" />
//                       Important
//                     </div>
//                   </div>

//                   {/* Description */}
//                   {notice.description && (
//                     <div className="mb-6">
//                       <p className="text-gray-700 leading-relaxed">
//                         {notice.description}
//                       </p>
//                     </div>
//                   )}

//                   {/* Attachments */}
//                   {(notice.image || notice.file) && (
//                     <div className="space-y-3">
//                       <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                         <Paperclip className="w-4 h-4" />
//                         <span>Attachments</span>
//                       </div>
                      
//                       <div className="flex flex-wrap gap-3">
//                         {notice.image && (
//                           <a
//                             href={`${import.meta.env.VITE_API_BASE_URL}/uploads/notices/${notice.image}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg px-3 py-2 transition-colors text-sm"
//                           >
//                             <Image className="w-4 h-4 text-green-600" />
//                             <span className="text-green-700 font-medium">View Image</span>
//                           </a>
//                         )}

//                         {notice.file && (
//                           <a
//                             href={`${import.meta.env.VITE_API_BASE_URL}/uploads/notices/${notice.file}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-2 transition-colors text-sm"
//                           >
//                             <Download className="w-4 h-4 text-blue-600" />
//                             <span className="text-blue-700 font-medium">Download File</span>
//                           </a>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
            
//             {/* Footer Stats */}
//             <div className="mt-8 text-center">
//               <div className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                   <span className="text-gray-700">
//                     {notices.length} Active Notice{notices.length !== 1 ? 's' : ''}
//                   </span>
//                 </div>
//                 <div className="w-px h-4 bg-gray-300"></div>
//                 <div className="text-gray-500">
//                   Last updated: {notices.length > 0 ? formatDate(notices[0].createdAt) : 'Never'}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ViewNotices;


import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoBell, IoWarning, IoTime, IoStar, IoAttach, IoImage, IoDownload, IoMail } from 'react-icons/io5';
import DecryptedText from '../components/DecryptedText';
import { useNavigate } from 'react-router-dom';

const ViewNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ Navigation hook

  useEffect(() => {
    const fetchNotices = async () => {
      const token = localStorage.getItem('studentToken');

      // ✅ Redirect if not logged in
      if (!token) {
        navigate('/'); // or '/student-login' if you have a separate route
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/students/notices/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotices(res.data.notices || res.data);
      } catch (err) {
        console.error('Error fetching notices:', err);

        // ✅ If unauthorized, force logout and redirect
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('studentToken');
          navigate('/');
        } else {
          setError('Failed to load notices. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [navigate]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return 'Today';
      if (diffDays === 2) return 'Yesterday';
      if (diffDays <= 7) return `${diffDays - 1} days ago`;

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {/* Header Skeleton */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>

          {/* Cards Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center max-w-md w-full">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <IoWarning className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Notices</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <IoBell className="w-6 h-6 text-blue-600" />
          </div>
          <DecryptedText
            className="text-3xl font-bold text-gray-900 mb-2"
            text="Notices"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-gray-600">Stay updated with important announcements</p>
        </div>

        {notices.length === 0 ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <IoMail className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notices Available</h3>
              <p className="text-gray-600">Check back later for new announcements</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice, index) => (
              <div
                key={notice._id || index} // Fallback for missing _id
                className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeIn 0.5s ease-out forwards',
                }}
              >
                {/* Notice Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {notice.title || 'Untitled Notice'}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 gap-4">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Active</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IoTime className="w-4 h-4" />
                          <span>{formatDate(notice.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Priority Badge */}
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <IoStar className="w-3 h-3" />
                      Important
                    </div>
                  </div>

                  {/* Description */}
                  {notice.description && (
                    <div className="mb-6">
                      <p className="text-gray-700 leading-relaxed">{notice.description}</p>
                    </div>
                  )}

                  {/* Attachments */}
                  {(notice.image || notice.file) && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <IoAttach className="w-4 h-4" />
                        <span>Attachments</span>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {notice.image && (
                          <a
                            href={`${import.meta.env.VITE_API_BASE_URL}/uploads/notices/${notice.image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg px-3 py-2 transition-colors text-sm"
                          >
                            <IoImage className="w-4 h-4 text-green-600" />
                            <span className="text-green-700 font-medium">View Image</span>
                          </a>
                        )}

                        {notice.file && (
                          <a
                            href={`${import.meta.env.VITE_API_BASE_URL}/uploads/notices/${notice.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-2 transition-colors text-sm"
                          >
                            <IoDownload className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-700 font-medium">Download File</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Footer Stats */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">
                    {notices.length} Active Notice{notices.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="text-gray-500">
                  Last updated: {notices.length > 0 ? formatDate(notices[0].createdAt) : 'Never'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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