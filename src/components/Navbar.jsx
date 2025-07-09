// import { useState, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   BookOpen,
//   Menu,
//   X,
//   LogOut,
//   LogIn,
//   Home,
//   Plus,
//   FileText,
//   User,
//   Bell,
//   Users,
//   FolderOpen,
//   ChevronDown,
//   Search
// } from 'lucide-react';

// const Navbar = () => {
//   const navigate = useNavigate();

//   const isAdmin = localStorage.getItem('isAdmin') === 'true';
//   const studentId = localStorage.getItem('studentId');
//   const email = localStorage.getItem('email') || '';
//   console.log('Sidebar email:', email);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleLogout = useCallback(() => {
//     localStorage.removeItem('isAdmin');
//     localStorage.removeItem('studentId');
//     localStorage.removeItem('email');
//     setIsSidebarOpen(false);
//     navigate(isAdmin ? '/' : '/');
//   }, [isAdmin, navigate]);

//   const toggleSidebar = useCallback(() => {
//     setIsSidebarOpen((prev) => !prev);
//   }, []);

//   const settings = isAdmin ? ['Logout'] : ['Profile', 'Logout'];

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded hover:bg-gray-700"
//         onClick={toggleSidebar}
//         aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
//         aria-expanded={isSidebarOpen}
//       >
//         {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//       </button>

//       {/* Sidebar */}
//       <nav
//         className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40 transform transition-transform duration-300 ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } lg:translate-x-0`}
//       >
//         <div className="flex flex-col h-full p-4">
//           {/* Logo Section */}
//           <Link
//             to={isAdmin ? '/admin-home' : '/student-home'}
//             className="flex items-center gap-3 mb-6 p-2 hover:bg-gray-50 rounded"
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
//               <BookOpen className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg font-semibold text-gray-900">
//                 {isAdmin ? 'Admin Portal' : 'Student Portal'}
//               </h1>
//               <p className="text-xs text-gray-500">
//                 {isAdmin ? 'Management Dashboard' : 'Learning Hub'}
//               </p>
//             </div>
//           </Link>

//           {/* Search Bar */}
//           <div className="mb-6 relative">
//             <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Navigation Menu */}
//           <ul className="flex-1 space-y-1">
//             {isAdmin ? (
//               <>
//                 <li>
//                   <Link
//                     to="/admin-home"
//                     className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                     onClick={() => setIsSidebarOpen(false)}
//                   >
//                     <FolderOpen className="w-4 h-4" />
//                     <span className="text-sm">All Assignments</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin-users"
//                     className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                     onClick={() => setIsSidebarOpen(false)}
//                   >
//                     <Users className="w-4 h-4" />
//                     <span className="text-sm">View Users</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/add-notice"
//                     className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                     onClick={() => setIsSidebarOpen(false)}
//                   >
//                     <Plus className="w-4 h-4" />
//                     <span className="text-sm">Add Notice</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/notice-list-admin"
//                     className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                     onClick={() => setIsSidebarOpen(false)}
//                   >
//                     <Bell className="w-4 h-4" />
//                     <span className="text-sm">View Notices</span>
//                   </Link>
//                 </li>
//               </>
//             ) : studentId ? (
//               <>
//                 <li>
//                   <Link
//                     to="/add-assignment"
//                     className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                     onClick={() => setIsSidebarOpen(false)}
//                   >
//                     <Plus className="w-4 h-4" />
//                     <span className="text-sm">Add Assignment</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/view-assignments"
//                     className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                     onClick={() => setIsSidebarOpen(false)}
//                   >
//                     <FileText className="w-4 h-4" />
//                     <span className="text-sm">View Assignments</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/view-notices"
//                     className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                     onClick={() => setIsSidebarOpen(false)}
//                   >
//                     <Bell className="w-4 h-4" />
//                     <span className="text-sm">View Notices</span>
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-3 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full text-left"
//                   aria-label="Login"
//                 >
//                   <LogIn className="w-4 h-4" />
//                   <span className="text-sm">Login</span>
//                 </button>
//               </li>
//             )}
//           </ul>

//           {/* User Menu */}
//           {(isAdmin || studentId) && (
//             <div className="mt-auto border-t border-gray-200 pt-4">
//               <button
//                 className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded w-full text-left"
//                 onClick={toggleSidebar}
//                 aria-label="User settings"
//                 aria-expanded={isSidebarOpen}
//               >
//                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm font-medium">
//                     {isAdmin ? 'A' : email ? email.charAt(0).toUpperCase() : 'U'}
//                   </span>
//                 </div>
//                 <div className="flex-1 text-left">
//                   <p className="text-sm font-medium text-gray-900 truncate">
//                     {isAdmin ? 'Administrator' : email}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {isAdmin ? 'System Admin' : 'Student'}
//                   </p>
//                 </div>
//                 <ChevronDown
//                   className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
//                     isSidebarOpen ? 'rotate-180' : ''
//                   }`}
//                 />
//               </button>

//               {/* User Dropdown */}
//               {isSidebarOpen && (
//                 <ul className="mt-2 bg-white border border-gray-200 rounded shadow-lg py-1">
//                   <div className="px-4 py-3 border-b border-gray-200">
//                     <p className="text-sm font-medium text-gray-900 truncate">
//                       {isAdmin ? 'Administrator' : email}
//                     </p>
//                     <p className="text-xs text-gray-500 truncate">
//                       {isAdmin ? 'admin@portal.com' : email}
//                     </p>
//                   </div>
//                   {settings.map((setting) => (
//                     <li key={setting}>
//                       <Link
//                           to={setting === 'Logout' ? '/': setting.toLowerCase()}
//                         className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         onClick={() => {
//                           setIsSidebarOpen(false);
//                           if (setting === 'Logout') handleLogout();
//                         }}
//                       >
//                         {setting === 'Profile' && (
//                           <User className="w-4 h-4 text-gray-500" />
//                         )}
//                         {setting === 'Logout' && (
//                           <LogOut className="w-4 h-4 text-gray-500" />
//                         )}
//                         <span className="text-sm">
//                           {setting}
//                         </span>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Main Content Shift */}
//       <div className="lg:ml-64 transition-all duration-300" />
//     </>
//   );
// };

// export default Navbar;


import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Menu,
  X,
  LogOut,
  LogIn,
  Home,
  Plus,
  FileText,
  User,
  Bell,
  Users,
  FolderOpen,
  ChevronDown,
  Search,
  Settings
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const studentId = localStorage.getItem('studentId');
  const email = localStorage.getItem('email') || '';
  console.log('Sidebar email:', email);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('studentId');
    localStorage.removeItem('email');
    setIsSidebarOpen(false);
    navigate(isAdmin ? '/' : '/');
  }, [isAdmin, navigate]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const settings = isAdmin ? ['Logout'] : ['Profile', 'Logout'];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-100">
            <Link
              to={isAdmin ? '/admin-home' : '/student-home'}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              onClick={() => setIsSidebarOpen(false)}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {isAdmin ? 'Admin Portal' : 'Student Portal'}
                </h1>
                <p className="text-xs text-gray-500">
                  {isAdmin ? 'Management Dashboard' : 'Learning Hub'}
                </p>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 p-4">
            <ul className="space-y-1">
              {isAdmin ? (
                <>
                  <li>
                    <Link
                      to="/admin-home"
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FolderOpen className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                      <span className="text-sm font-medium">All Assignments</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin-users"
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Users className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                      <span className="text-sm font-medium">View Users</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add-notice"
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Plus className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                      <span className="text-sm font-medium">Add Notice</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/notice-list-admin"
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Bell className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                      <span className="text-sm font-medium">View Notices</span>
                    </Link>
                  </li>
                </>
              ) : studentId ? (
                <>
                  <li>
                    <Link
                      to="/add-assignment"
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Plus className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                      <span className="text-sm font-medium">Add Assignment</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/view-assignments"
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <FileText className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                      <span className="text-sm font-medium">View Assignments</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/view-notices"
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Bell className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                      <span className="text-sm font-medium">View Notices</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full text-left transition-colors group"
                    aria-label="Login"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="text-sm font-medium">Login</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* User Menu */}
          {(isAdmin || studentId) && (
            <div className="border-t border-gray-100 p-4">
              <div className="relative">
                <button
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg w-full text-left transition-colors"
                  onClick={toggleSidebar}
                  aria-label="User settings"
                  aria-expanded={isSidebarOpen}
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {isAdmin ? 'A' : email ? email.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {isAdmin ? 'Administrator' : email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isAdmin ? 'System Admin' : 'Student'}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isSidebarOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* User Dropdown */}
                {isSidebarOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {isAdmin ? 'Administrator' : email}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {isAdmin ? 'admin@portal.com' : email}
                      </p>
                    </div>
                    <ul>
                      {settings.map((setting) => (
                        <li key={setting}>
                          <Link
                            to={setting === 'Logout' ? '/' : setting.toLowerCase()}
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => {
                              setIsSidebarOpen(false);
                              if (setting === 'Logout') handleLogout();
                            }}
                          >
                            {setting === 'Profile' && (
                              <User className="w-4 h-4 text-gray-500" />
                            )}
                            {setting === 'Logout' && (
                              <LogOut className="w-4 h-4 text-gray-500" />
                            )}
                            <span className="text-sm font-medium">
                              {setting}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Shift */}
      <div className="lg:ml-64 transition-all duration-300" />
    </>
  );
};

export default Navbar;