import React, { useState } from 'react';
import auth_image from './../assets/auth_image.jpg'
import axiosInstance from '../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axiosInstance.post('/auth/signup', { email: formData.email });

      setMessage(res.data.message);

      setShowOtpInput(true);  
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
        const res = await axiosInstance.post('/auth/verify-otp', {
        name: formData.name,
        dob: formData.dob,
        email: formData.email,
        otp: otp
        });

        setMessage(res.data.message);
        navigate('/dashboard')

    } catch (error) {
        setMessage(error.response?.data?.message || 'OTP verification failed');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-md overflow-hidden flex">
        {/* Left Side Form */}
        <div className="w-full md:w-1/2 p-4 md:p-10">
          <h2 className="text-3xl font-bold mb-2">Sign up</h2>
          <p className="text-sm text-gray-500 mb-6">Sign up to enjoy the feature of HD</p>

          <form onSubmit={handleSendOtp} className="space-y-4">

            {/* Name Field */}
            <div className="relative mb-6">
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jonas Khanwald"
                className="peer w-full px-4 pt-3 pb-2 border border-gray-500 text-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <label
                htmlFor="name"
                className="absolute left-3 -top-2 text-sm bg-white px-1 text-gray-500 peer-focus:text-blue-500 transition-all"
              >
                Your Name
              </label>
            </div>

            {/* Date of Birth Field */}
            <div className="relative mb-6">
              <input
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="peer w-full px-4 py-2 border border-gray-500 text-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <label
                htmlFor="dob"
                className="absolute left-3 -top-2 text-sm bg-white px-1 text-gray-500 peer-focus:text-blue-500 transition-all"
              >
                Date of Birth
              </label>
            </div>

            {/* Email Field */}
            <div className="relative mb-6">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jonas_kahnwald@gmail.com"
                className="peer w-full px-4 py-2 border border-gray-500 text-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-3 -top-2 text-sm bg-white px-1 text-gray-500 peer-focus:text-blue-500 transition-all"
              >
                Email
              </label>
            </div>

            {message && <p className="text-center text-sm text-gray-600">{message}</p>}

            {showOtpInput ? (
                <div className="space-y-4 mt-6">
                    <div className="relative">
                    <input
                        type="text"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter the OTP sent to your email"
                        className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    </div>

                    <button
                    onClick={handleVerifyOtp}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
                    disabled={loading}
                    >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </div>
            ) : 

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Get OTP'}
            </button>
        }
          </form>

          <div className='mt-4 text-center'>
            <a href="http://localhost:5000/api/auth/google">
              <button className="bg-red-500 text-white px-4 py-2 rounded">Continue with Google</button>
            </a>
          </div>

          <p className="text-sm mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to={'/login'} className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={auth_image}
            alt="Wallpaper"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;