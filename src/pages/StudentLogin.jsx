// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { LogIn, Mail, Lock } from "lucide-react";
// import DecryptedText from "../components/DecryptedText";
// import LoginButton from "../components/LoginButton";
// import Lottie from "lottie-react";
// import login from "../assets/login.json";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/students/login`,
//         formData
//       );
//       setMessage(res.data.message);
//       localStorage.setItem("studentId", res.data.student.id);
//       localStorage.setItem("email", res.data.student.email);
//       localStorage.setItem("fullName", res.data.student.fullName);
//       localStorage.setItem("studentToken", res.data.token); // ✅ Add this

//       setTimeout(() => {
//         navigate("/student-home");
//       }, 1500);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div
//       className="bg-cover bg-center"
//       style={{
//         backgroundImage: "url('https://via.placeholder.com/1920x1080')",
//       }}
//     >
//       <div className="min-h-screen bg-gradient-to-b from-slate-900/80 to-blue-900/80 flex items-center justify-center transition-all duration-300">
//         <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20">
//           <div className="text-center mb-4">
//             {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
//                 <LogIn className="w-5 h-5 text-white" />
//               </div> */}
//             <div className="mx-auto mb-2 " style={{ width: '150px', height: '150px' }}>
//   <Lottie animationData={login} loop={true} />
// </div>


//             <DecryptedText
//               className="text-2xl font-bold text-white bg-clip-text bg-gradient-to-r from-white to-blue-200"
//               text="Student Login"
//               animateOn="view"
//               revealDirection="center"
//             />
//             <p className="text-blue-200 text-xs mt-1 opacity-75">
//               Sign in to your student account
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="relative">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 onChange={handleChange}
//                 value={formData.email}
//                 required
//                 className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2">
//                 <Mail className="w-4 h-4 text-gray-400" />
//               </div>
//             </div>

//             <div className="relative">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 onChange={handleChange}
//                 value={formData.password}
//                 required
//                 className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2">
//                 <Lock className="w-4 h-4 text-gray-400" />
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-xs">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-3 w-3 text-blue-400 focus:ring-blue-500 border-gray-500 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-1 text-gray-300">
//                   Remember me
//                 </label>
//               </div>
//               <Link
//                 to="/forgot-password"
//                 className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             <div className="flex justify-center">
//               <LoginButton
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium text-base shadow-md hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
//               >
//                 Login
//               </LoginButton>
//             </div>
//           </form>

//           {message && (
//             <div
//               className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
//                 message.includes("failed")
//                   ? "bg-red-500/20 text-red-200 border border-red-500/30"
//                   : "bg-green-500/20 text-green-200 border border-green-500/30"
//               }`}
//             >
//               {message}
//             </div>
//           )}

//           <div className="mt-4 text-center">
//             <Link
//               to="/register"
//               className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline transition-colors duration-200"
//             >
//               Don't have an account?{" "}
//               <span className="font-semibold">Register here</span>
//             </Link>
//           </div>

//           <div className="mt-4 text-center">
//             <div className="flex items-center justify-center space-x-3 text-gray-400 text-xs">
//               <div className="h-px bg-gray-500/20 flex-1"></div>
//               <span>Admin Access</span>
//               <div className="h-px bg-gray-500/20 flex-1"></div>
//             </div>
//             <div className="mt-2">
//               <Link to="/admin-login">
//                 <button className="bg-gray-500/50 text-white px-4 py-1 rounded-lg hover:bg-gray-600/50 transition-colors duration-200 text-sm font-medium">
//                   Admin Login
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, Shield, UserPlus } from "lucide-react";
import DecryptedText from "../components/DecryptedText";
import LoginButton from "../components/LoginButton";
import Lottie from "lottie-react";
import login from "../assets/login.json";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/students/login`,
        formData
      );
      setMessage(res.data.message);
      localStorage.setItem("studentId", res.data.student.id);
      localStorage.setItem("email", res.data.student.email);
      localStorage.setItem("fullName", res.data.student.fullName);
      localStorage.setItem("studentToken", res.data.token); // ✅ Add this

      setTimeout(() => {
        navigate("/student-home");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Main Login Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
              <Lottie animationData={login} loop={true} />
            </div>
            <DecryptedText
              className="text-2xl font-bold text-gray-900 mb-2"
              text="Student Login"
              animateOn="view"
              revealDirection="center"
            />
            <p className="text-gray-600 text-sm">
              Sign in to your student account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                onChange={handleChange}
                value={formData.email}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={formData.password}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <LoginButton
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </LoginButton>
          </form>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-lg text-center text-sm font-medium ${
                message.includes("failed")
                  ? "bg-red-50 text-red-800 border border-red-200"
                  : "bg-green-50 text-green-800 border border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Admin Access Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-3 text-sm text-gray-500 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin Access
              </div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <Link to="/admin-login">
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center gap-2 mx-auto">
                <Shield className="w-4 h-4" />
                Admin Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;