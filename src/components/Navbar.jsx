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
  Search
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-slate-900 to-blue-900 backdrop-blur-lg bg-opacity-95 text-white shadow-2xl z-40 border-r border-white/10 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo Section */}
          <Link
            to={isAdmin ? '/admin-home' : '/student-home'}
            className="flex items-center gap-3 mb-8 group transition-all duration-300 hover:scale-105"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {isAdmin ? 'Admin Portal' : 'Student Portal'}
              </h1>
              <p className="text-xs text-blue-200 opacity-75">
                {isAdmin ? 'Management Dashboard' : 'Learning Hub'}
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="mb-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Navigation Menu */}
          <ul className="flex-1 space-y-2">
            {isAdmin ? (
              <>
                <li>
                  <Link
                    to="/admin-home"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FolderOpen className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium group-hover:text-white transition-colors">All Assignments</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin-users"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Users className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium group-hover:text-white transition-colors">View Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-notice"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Plus className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium group-hover:text-white transition-colors">Add Notice</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/notice-list-admin"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Bell className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium group-hover:text-white transition-colors">View Notices</span>
                  </Link>
                </li>
              </>
            ) : studentId ? (
              <>
                <li>
                  <Link
                    to="/add-assignment"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Plus className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium group-hover:text-white transition-colors">Add Assignment</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view-assignments"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FileText className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium group-hover:text-white transition-colors">View Assignments</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view-notices"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Bell className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium group-hover:text-white transition-colors">View Notices</span>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 w-full text-left"
                  aria-label="Login"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="text-sm font-medium">Login</span>
                </button>
              </li>
            )}
          </ul>

          {/* User Menu */}
          {(isAdmin || studentId) && (
            <div className="mt-auto">
              <button
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={toggleSidebar}
                aria-label="User settings"
                aria-expanded={isSidebarOpen}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">
                    {isAdmin ? 'A' : email ? email.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium truncate">
                    {isAdmin ? 'Administrator' : email}
                  </p>
                  <p className="text-xs text-blue-200 opacity-75">
                    {isAdmin ? 'System Admin' : 'Student'}
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-blue-300 transition-transform duration-300 ${
                    isSidebarOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* User Dropdown */}
              {isSidebarOpen && (
                <ul className="mt-2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 py-2 text-sm">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {isAdmin ? 'Administrator' : email}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {isAdmin ? 'admin@portal.com' : email}
                    </p>
                  </div>
                  {settings.map((setting) => (
                    <li key={setting}>
                      <Link
                        to={setting.toLowerCase()}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-all duration-200 group"
                        onClick={() => {
                          setIsSidebarOpen(false);
                          if (setting === 'Logout') handleLogout();
                        }}
                      >
                        {setting === 'Profile' && (
                          <User className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                        )}
                        {setting === 'Logout' && (
                          <LogOut className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                        )}
                        <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                          {setting}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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