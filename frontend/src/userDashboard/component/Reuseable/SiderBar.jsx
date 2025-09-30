
// import {
//   LayoutDashboard,
//   User,
//   Settings,
//   MessageSquare,
//   LogOut,
//   CookingPot,

// } from 'lucide-react';

// // The Sidebar component for navigation.
// const Sidebar = ({ activePage, setActivePage }) => {
//   const navItems = [
//     { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, page: 'dashboard' },
//     { name: 'Profile', icon: <User className="h-5 w-5" />, page: 'profile' },
//     { name: 'Messages', icon: <MessageSquare className="h-5 w-5" />, page: 'messages' },
//     { name: 'Recipes', icon: <CookingPot className="h-5 w-5" />, page: 'recipes' },
//     { name: 'Settings', icon: <Settings className="h-5 w-5" />, page: 'settings' },
//   ];

//   return (
//     <aside className="fixed top-0 left-0 bottom-0 z-50 bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out p-4 flex flex-col justify-between">
//       {/* Sidebar Content Top */}
//       <div>
//         {/* Logo/Title Section */}
//         <div className="p-6 text-2xl font-bold text-gray-800 border-b border-gray-700">
//           Dashboard
//         </div>

//         {/* Primary Navigation List */}
//         <nav className="p-4 space-y-2">
//           {navItems.map((item) => (
//             <button
//               key={item.name}
//               onClick={() => setActivePage(item.page)}
//               className={`flex items-center w-full p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
//                 activePage === item.page
//                   ? 'bg-blue-600 text-white shadow-inner'
//                   : 'text-gray-600 hover:bg-gray-700 hover:text-white'
//               }`}
//             >
//               {item.icon}
//               <span className="ml-3">{item.name}</span>
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Sidebar Content Bottom */}
//       <div className="p-4 border-t border-gray-700">
//         {/* Logout Link */}
//         <button className="flex items-center w-full p-3 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-200">
//           <LogOut className="h-5 w-5" />
//           <span className="ml-3">Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// };

// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Settings,
  MessageSquare,
  LogOut,
  CookingPot,
  X,
} from 'lucide-react';

// This is the main Sidebar component. It's a reusable component for navigation.
// It now accepts 'activePage' and 'onLinkClick' props instead of using useLocation.
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activePage, onLinkClick }) => {
  // Array of navigation items. The paths are updated to match your App.jsx routes.
  // The icons are now defined with consistent sizing and margin classes directly.
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5 mr-3" />, path: '/DashboardUser' },
    { name: 'Profile', icon: <User className="h-5 w-5 mr-3" />, path: '/Profile' },
    { name: 'Messages', icon: <MessageSquare className="h-5 w-5 mr-3" />, path: '/Message' },
    { name: 'Recipes', icon: <CookingPot className="h-5 w-5 mr-3" />, path: '/recipe' },
    // { name: 'Settings', icon: <Settings className="h-5 w-5 mr-3" />, path: '/setting' },
  ];

  return (
    <>
      {/* Mobile overlay for when the sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* The main sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 transform flex-col bg-white text-gray-600 shadow-lg transition-transform duration-300 ease-in-out lg:fixed lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header/Logo */}
        <div className="flex items-center justify-between p-5 text-2xl font-bold tracking-wider text-gray-800 border-b border-gray-200 ">
          <div className='font-serif'>
            <span className="text-blue-600">Foodie</span>
            <span className="text-gray-800">Land</span>
          </div>
          {/* Close button for mobile sidebar */}
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Primary Navigation List */}
        <nav className="flex-1 px-4 py-8">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => {
                    if (onLinkClick) {
                      onLinkClick(item.path);
                    }
                    setIsSidebarOpen(false); // Close sidebar on mobile after clicking a link
                  }}
                  className={`flex items-center w-full p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activePage === item.path
                      ? 'bg-blue-600 text-white shadow-inner'
                      : 'hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Link at the bottom */}
        <div className="mt-auto px-4 py-6 border-t border-gray-200">
          <Link
            to="/Login"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center w-full p-3 rounded-lg text-sm font-medium text-red-500 hover:bg-gray-100 transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
