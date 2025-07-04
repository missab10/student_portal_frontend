
import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <nav className="fixed top-0 left-0 w-full bg-orange-950/90 backdrop-blur-md text-white px-4 sm:px-6 py-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={isAdmin ? '/admin-home' : '/student-home'} className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-coral-500 to-red-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-lg sm:text-xl font-bold">
            {isAdmin ? '📚 Admin Portal' : '📘 Student Portal'}
          </h1>
        </Link>

        <button
          className="sm:hidden focus:outline-none focus:ring-2 focus:ring-coral-500 rounded"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        <ul
          className={`sm:flex sm:items-center sm:gap-6 md:gap-8 text-sm sm:text-base ${
            isMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-orange-950/90 backdrop-blur-md p-4 shadow-lg' : 'hidden sm:flex'
          }`}
        >
          {isAdmin ? (
            <>
              <li>
                <Link
                  to="/admin-home"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-800 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📂 All Assignments
                </Link>
              </li>
              <li>
                <Link
                  to="/admin-users"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-800 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  👥 View Users
                </Link>
              </li>
              <li>
                <Link
                  to="/add-notice"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-800 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📄 Add Notice
                </Link>
              </li>
              <li>
                <Link
                  to="/notice-list-admin"
                  className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-800 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📄 View Notices
                </Link>
              </li>
            </>
          ) : (
            // <>
            //   <li>
            //     <Link
            //       to="/add-assignment"
            //       className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-800 transition-colors duration-200"
            //       onClick={() => setIsMenuOpen(false)}
            //     >
            //       ➕ Add Assignment
            //     </Link>
            //   </li>
            //   <li>
            //     <Link
            //       to="/view-assignments"
            //       className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-800 transition-colors duration-200"
            //       onClick={() => setIsMenuOpen(false)}
            //     >
            //       📄 View Assignments
            //     </Link>
            //   </li>
            // </>

            <>
  <li>
    <Link
      to="/add-assignment"
      className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-800 transition-colors duration-200"
      onClick={() => setIsMenuOpen(false)}
    >
      ➕ Add Assignment
    </Link>
  </li>
  <li>
    <Link
      to="/view-assignments"
      className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-800 transition-colors duration-200"
      onClick={() => setIsMenuOpen(false)}
    >
      📄 View Assignments
    </Link>
  </li>
  <li>
    <Link
      to="/profile"
      className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-800 transition-colors duration-200"
      onClick={() => setIsMenuOpen(false)}
    >
      👤 Profile
    </Link>
  </li>
  <li>
    <Link
      to="/view-notices"
      className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-800 transition-colors duration-200"
      onClick={() => setIsMenuOpen(false)}
    >
      📄 View Notices
    </Link>
  </li>
</>

          )}
          <li>
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 py-2 sm:py-0 text-white hover:text-blue-800 transition-colors duration-200"
              aria-label={isAdmin || studentId ? 'Logout' : 'Login'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isAdmin || studentId ? 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' : 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'}
                />
              </svg>
              {isAdmin || studentId ? 'Logout' : 'Login'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
