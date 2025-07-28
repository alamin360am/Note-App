import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/AuthContext';
import logo from './../assets/image.png';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [load, setLoad] = useState(false);
  const [note, setNote] = useState([]);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await axiosInstance.post('/auth/logout');
      if (res.data) {
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveNote = async () => {
    try {
      setLoad(true);
      const res = await axiosInstance.post('/notes', { content: text });
      if (res.data) {
        setText('');
        setOpen(false);
        await getNotes();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const getNotes = async () => {
    try {
      const res = await axiosInstance.get('/notes');
      setNote(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoad(true);
      const res = await axiosInstance.delete(`/notes/${id}`);
      if (res.data) {
        await getNotes();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto relative">

            {/* Modal */}
            {open && (
            <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30">
                <div className="bg-white/60 backdrop-blur-md w-full max-w-md p-6 rounded-xl shadow-xl border border-white/20">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-gray-800 text-xl font-semibold">Write your note</h2>
                    <button
                    onClick={() => setOpen(false)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                    >
                    Close
                    </button>
                </div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-40 p-3 mb-4 border border-gray-400 rounded resize-none focus:outline-none focus:border-gray-600"
                    placeholder="Type your note here..."
                />
                <div className="flex justify-end">
                    <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer"
                    disabled={load}
                    >
                    {load ? 'Saving...' : 'Save'}
                    </button>
                </div>
                </div>
            </div>
            )}

            {/* Header */}
            <nav className="flex flex-row justify-between items-center mb-10 gap-3">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Logo" className="w-10" />
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                </div>
            <button
                onClick={handleSignOut}
                className="text-blue-600 border-b border-transparent hover:border-blue-600 transition cursor-pointer"
            >
                Sign Out
            </button>
            </nav>

            {/* User Info */}
            <div className="bg-white shadow-md px-6 py-8 rounded-xl mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome, {user?.name}!</h2>
                <p className="text-gray-600">Email: {user?.email}</p>
            </div>

            {/* Create Button */}
            <button
            onClick={() => setOpen(true)}
            className="w-full py-3 mb-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
            >
            Create New Note
            </button>

            {/* Notes Section */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Notes</h3>
            <div className="space-y-4">
            {note.length === 0 ? (
                <p className="text-gray-500">You haven’t added any notes yet.</p>
            ) : (
                note.map((note) => (
                <div
                    key={note._id}
                    className="flex justify-between items-start bg-white px-5 py-4 rounded-lg shadow-md"
                >
                    <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                    <button
                    onClick={() => handleDelete(note._id)}
                    className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm cursor-pointer"
                    disabled={load}
                    >
                    {load ? 'Please wait...' : 'Delete'}
                    </button>
                </div>
                ))
            )}
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
