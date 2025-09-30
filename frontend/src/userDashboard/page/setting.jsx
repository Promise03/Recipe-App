// import React, { useState } from 'react';
// import Sidebar from '../component/Reuseable/SiderBar';
// import Header from '../component/Reuseable/Header';

// // The Settings Page component with various user settings.
// const Setting = () => {
//   const [notifications, setNotifications] = useState(true);

//   return (
//     <>
//     <Header/>
//     <Sidebar/>
//     <div className="space-y-8 p-8 max-w-4xl mx-auto pt-20 lg:ml-64">
//       <h1 className="text-4xl font-extrabold text-gray-900">Settings</h1>
//       <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
//         {/* Account Settings Section */}
//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold text-gray-900">Account</h2>
//           <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//             <div>
//               <p className="font-medium text-gray-900">Change Password</p>
//               <p className="text-sm text-gray-600">Update your account password for security.</p>
//             </div>
//             <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
//               Change
//             </button>
//           </div>
//           <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//             <div>
//               <p className="font-medium text-gray-900">Delete Account</p>
//               <p className="text-sm text-gray-600">Permanently delete your account and all data.</p>
//             </div>
//             <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-full hover:bg-red-50 transition-colors">
//               Delete
//             </button>
//           </div>
//         </div>
        
//         {/* Notifications Settings Section */}
//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
//           <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//             <div>
//               <p className="font-medium text-gray-900">Email Notifications</p>
//               <p className="text-sm text-gray-600">Receive email alerts for important updates.</p>
//             </div>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 value=""
//                 className="sr-only peer"
//                 checked={notifications}
//                 onChange={() => setNotifications(!notifications)}
//               />
//               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };


// export default Setting