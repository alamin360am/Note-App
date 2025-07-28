import React, { useContext } from 'react'
import { UserContext } from '../context/AuthContext'
import logo from './../assets/image.png'
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate()

    const handleSignOut = async() => {
        try {
            const res = await axiosInstance.post('/auth/logout');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.log(error);            
        }
    }
    
  return (
    <div className='px-10 py-6'>
      <nav className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
            <img src={logo} alt="Logo" className='w-10' />
            <h2 className='text-xl font-medium'>Dashboard</h2>
        </div>
        <button onClick={handleSignOut} className='text-blue-600 border-b cursor-pointer'>Sign Out</button>
      </nav>
    </div>
  )
}

export default Dashboard
