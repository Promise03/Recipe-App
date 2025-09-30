import React, { useEffect, useState } from 'react';
import {
  Pencil,
  Save,
} from 'lucide-react';
import Sidebar from '../component/Reuseable/SiderBar';
import Header from '../component/Reuseable/Header';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// The Profile Page component with a form to edit user details.
const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = useSelector((state) => state.auth)
  const id = useParams

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would be where you send data to an API
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

 useEffect(() => {
   const userData = async() =>{
    try{
      const res = await axios.get(
        "http://localhost:5000/api/user/get-user/:id",
        {headers: {
          Authorization: `Bearer ${token}`
        }}
      )
      const found = res.data.userDetails.find((i) => i._id ===id)
      profileData(found)
    }catch(e){
      console.log(e.message)
    }
   }
   userData()
 }, [id, token])

  return (
   <div>
    <Header/>
    <Sidebar/>
     <div className="space-y-8 p-8 max-w-4xl mx-auto pt-20 lg:ml-64">
      <h1 className="text-4xl font-extrabold text-gray-900">User Profile</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
            {profileData.username}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900">{profileData.name}</h2>
            <p className="text-gray-500">{profileData.email}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          >
            <Pencil className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        
        {/* Profile Details Form */}
        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="text-gray-700 font-medium">Name</span>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors ${!isEditing ? 'bg-gray-100 text-gray-600' : 'bg-white'}`}
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-medium">Email Address</span>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors ${!isEditing ? 'bg-gray-100 text-gray-600' : 'bg-white'}`}
            />
          </label>
          {/* <label className="block">
            <span className="text-gray-700 font-medium">Bio</span>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows="4"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors ${!isEditing ? 'bg-gray-100 text-gray-600' : 'bg-white'}`}
            />
          </label> */}
        </div>
        
        {isEditing && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-3 text-sm font-bold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors shadow-md"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
   </div>
  );
};


export default Profile