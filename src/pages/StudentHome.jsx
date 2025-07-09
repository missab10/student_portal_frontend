import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextPressure from '../components/TextPressure';

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
    <>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:ml-64 transition-all duration-300">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm border border-gray-200 p-8 lg:p-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div className="mb-4 w-full max-w-2xl">
            <TextPressure
              text="Welcome to Student Home!"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#1f2937"
              strokeColor="#3b82f6"
              minFontSize={32}
            />
          </div>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Manage your assignments with ease and track your academic progress
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <button
            onClick={handleAddAssignment}
            className="flex items-center justify-center gap-2 w-full lg:w-auto min-w-[240px] bg-blue-600 text-white py-3 px-6 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Assignment
          </button>

          <button
            onClick={handleViewAssignments}
            className="flex items-center justify-center gap-2 w-full lg:w-auto min-w-[240px] bg-gray-600 text-white py-3 px-6 rounded-lg font-medium shadow-sm hover:bg-gray-700 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Your Assignments
          </button>
        </div>
      </div>
    </div>
    </>

  );
};

export default StudentHome;