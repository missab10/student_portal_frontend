import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Hash, Phone, Calendar, Edit, Loader } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    if (!studentId) {
      setError('You must be logged in to view your profile');
      navigate('/');
      return;
    }

    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/students/${studentId}`);
        setStudent(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      }
    };

    fetchStudent();
  }, [studentId, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="text-center bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 font-medium shadow-md">
          {error}
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin h-12 w-12 text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 sm:p-8 lg:p-12">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <div style={{ marginTop: '4rem' }}>
            <DecryptedText
              className="text-3xl font-extrabold text-gray-900"
              text="Student Profile"
              animateOn="view"
              revealDirection="center"
            />
          </div>
          <p className="text-gray-500 mt-2">Your account details</p>
        </div>
        <div className="space-y-4 text-gray-700 bg-gray-50 rounded-lg p-6 shadow-inner">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-blue-600" />
            <p><strong>Name:</strong> {student.fullName}</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <p><strong>Email:</strong> {student.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-blue-600" />
            <p><strong>Age:</strong> {student.age}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-blue-600" />
            <p><strong>Phone Number:</strong> {student.phoneNumber}</p>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <p><strong>Registered On:</strong> {new Date(student.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/edit-profile')}
            className="flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Edit Profile"
          >
            <Edit className="w-5 h-5" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;