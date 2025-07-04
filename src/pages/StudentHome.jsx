import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentHome = () => {
  const navigate = useNavigate();

  // Check session on component mount
  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      navigate('/'); // Redirect if not logged in
    }
  }, [navigate]);

  const handleAddAssignment = () => {
    navigate('/add-assignment');
  };

  const handleViewAssignments = () => {
    navigate('/view-assignments');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/30">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-coral-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Welcome to Student Home!</h1>
          <p className="text-gray-600 text-sm">Manage your assignments with ease</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleAddAssignment}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-coral-500 to-red-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:from-coral-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Assignment
          </button>
          <button
            onClick={handleViewAssignments}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-coral-500 to-red-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:from-coral-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Your Assignments
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;