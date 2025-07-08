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
  FolderOpen
} from 'lucide-react';

const Navbar = () => {
  const [isAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [studentId] = useState(localStorage.getItem('studentId'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('studentId');
    setIsMenuOpen(false); // Close mobile menu
    navigate(isAdmin ? '/admin-login' : '/');
  }, [isAdmin, navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-900 text-white px-4 sm:px-6 py-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={isAdmin ? '/admin-home' : '/student-home'} className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold">
            {isAdmin ? 'Admin Portal' : 'Student Portal'}
          </h1>
        </Link>

        <button
          className="sm:hidden focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>

        <ul
          className={`sm:flex sm:items-center sm:gap-6 md:gap-8 text-sm sm:text-base ${
            isMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-blue-900 p-4 shadow-lg' : 'hidden sm:flex'
          }`}
        >
          {(isAdmin || studentId) && isAdmin ? (
            <>
              <li>
                <Link
                  to="/admin-home"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FolderOpen className="w-4 h-4" />
                  All Assignments
                </Link>
              </li>
              <li>
                <Link
                  to="/admin-users"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="w-4 h-4" />
                  View Users
                </Link>
              </li>
              <li>
                <Link
                  to="/add-notice"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Plus className="w-4 h-4" />
                  Add Notice
                </Link>
              </li>
              <li>
                <Link
                  to="/notice-list-admin"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell className="w-4 h-4" />
                  View Notices
                </Link>
              </li>
            </>
          ) : (isAdmin || studentId) ? (
            <>
              <li>
                <Link
                  to="/add-assignment"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Plus className="w-4 h-4" />
                  Add Assignment
                </Link>
              </li>
              <li>
                <Link
                  to="/view-assignments"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText className="w-4 h-4" />
                  View Assignments
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/view-notices"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell className="w-4 h-4" />
                  View Notices
                </Link>
              </li>
            </>
          ) : null}
          <li>
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-300 transition-colors duration-200"
              aria-label={isAdmin || studentId ? 'Logout' : 'Login'}
            >
              {isAdmin || studentId ? (
                <LogOut className="w-5 h-5" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {isAdmin || studentId ? 'Logout' : 'Login'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;