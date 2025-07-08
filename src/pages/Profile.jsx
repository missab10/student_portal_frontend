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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex items-center justify-center p-4 sm:p-6 lg:ml-64 transition-all duration-300">
        <div className="text-center bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl p-4 font-medium shadow-lg max-w-md w-full">
          {error}
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex items-center justify-center p-4 sm:p-6 lg:ml-64 transition-all duration-300">
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin h-12 w-12 text-blue-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <DecryptedText
            className="text-3xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-white to-blue-200"
            text="Student Profile"
            animateOn="view"
            revealDirection="center"
          />
          <p className="text-blue-200 mt-2 text-sm opacity-75">Your account details</p>
        </div>
        <div className="space-y-4 text-gray-300 bg-white/5 rounded-xl p-6 shadow-inner border border-white/20">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-blue-400" />
            <p><strong>Name:</strong> {student.fullName}</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-400" />
            <p><strong>Email:</strong> {student.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-blue-400" />
            <p><strong>Age:</strong> {student.age}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-blue-400" />
            <p><strong>Phone Number:</strong> {student.phoneNumber}</p>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-400" />
            <p><strong>Registered On:</strong> {new Date(student.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Buttonn
            onClick={() => navigate('/edit-profile')}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Edit Profile"
          >
            <Edit className="w-5 h-5" />
            Edit Profile
          </Buttonn>
        </div>
      </div>
    </div>
  );
};

export default Profile;