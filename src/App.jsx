import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StudentForm from './pages/StudentForm';
import Login from './pages/StudentLogin';
import StudentHome from './pages/StudentHome';
import AddAssignment from './pages/AddAssignment';
import ViewAssignment from './pages/ViewAssignment';
import AdminLogin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';
import ViewUsers from './pages/ViewUsers';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import AddNotice from './pages/AddNotice';
import ViewNotices from './pages/ViewNotices';
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import NoticeListAdmin from './pages/NoticeListAdmin';


const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/', '/register', '/admin-login'];

  return (
    <>
      <SmoothCursor />
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<StudentForm />} />
          <Route path="/student-home" element={<StudentHome />} />
          <Route path="/add-assignment" element={<AddAssignment />} />
          <Route path="/view-assignments" element={<ViewAssignment />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin-users" element={<ViewUsers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/add-notice" element={<AddNotice />} />
          <Route path="/view-notices" element={<ViewNotices />} />
          <Route path="/notice-list-admin" element={<NoticeListAdmin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;