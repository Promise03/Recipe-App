import {
  X,
} from 'lucide-react';

// Component to view user details in a modal
const UserDetailsModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0  bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User Details</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-lg font-semibold text-gray-900">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Role</p>
            <p className="text-lg font-semibold text-gray-900">{user.role}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="text-lg font-semibold text-gray-900">{user.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal



import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// function editUserModa() {

//   const [formdata, setFormdata] = useState({
//     name: "",
//     userName: "",
//     password: "",
//     role: "",
//     })
//     const handleEditformChange = (e) =>{
// const{name, value} = e.target;
// setFormdata((prev) => ({...prev, [name]: value}))
//     };
//     const {id} = useParams();
//     const {token} = useSelector((state) => state.auth)

//   const BASE_URL = import.meta.env.VITE_API_BASE_URL
//     const handleUpdateuser = async () => {
//       try{
//         await axios.patch(`${BA}/api/user/update-profile/${id}`, formdata,
//           {
//             headers:
//              {
//               Authorization: `Bearer ${token}`
//              }
//           }
//         )
//       }catch(e){
//         console.log(e.message)
//       }
//     }
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default editUserModa