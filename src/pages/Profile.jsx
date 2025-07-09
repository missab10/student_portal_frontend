
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Hash, Phone, Calendar, Edit, Loader } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';
import Buttonn from '../components/Buttonn';

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
      const token = localStorage.getItem('studentToken');
      if (!token) {
        setError('You must be logged in to view your profile');
        navigate('/');
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/students/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudent(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching profile:', err);

        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('studentToken');
          localStorage.removeItem('studentId');
          navigate('/');
        } else {
          setError('Failed to load profile');
        }
      }
    };

    fetchStudent();
  }, [studentId, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 lg:ml-64 bg-gray-100">
        <div className="max-w-md w-full bg-white border border-red-300 text-red-600 text-center p-6 rounded-lg shadow">
          {error}
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 lg:ml-64 bg-gray-100">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 lg:p-10 lg:ml-64 bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <DecryptedText
            className="text-2xl font-bold text-gray-800"
            text="Student Profile"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-sm text-gray-500 mt-1">Your account details</p>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-blue-500" />
            <p><strong>Name:</strong> {student.fullName}</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-blue-500" />
            <p><strong>Email:</strong> {student.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Hash className="w-4 h-4 text-blue-500" />
            <p><strong>Age:</strong> {student.age}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-blue-500" />
            <p><strong>Phone:</strong> {student.phoneNumber}</p>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-blue-500" />
            <p><strong>Registered:</strong> {new Date(student.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Buttonn
            onClick={() => navigate('/edit-profile')}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </Buttonn>
        </div>
      </div>
    </div>
  );
};

export default Profile;
