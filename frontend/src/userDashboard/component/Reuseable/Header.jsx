import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, Menu } from 'lucide-react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Use useSelector to get the user's name from the auth state.
  // Assuming the user's name is stored under state.auth.user.name or similar.
  const user = useSelector((state) => state.auth.user);
  const userName = user?.name || 'Guest'; // Default to 'Guest' if not available
  const role = user?.role 

  const navItems = [
    { name: 'Dashboard', page: '/DashboardUser' },
    { name: 'Profile', page: '/Profile' },
    { name: 'Messages', page: '/Message' },
    { name: 'Recipes', page: '/recipe' },
    { name: 'Settings', page: '/setting' },
  ];

  const currentPageTitle = navItems.find(item => item.page === location.pathname)?.name || 'Dashboard';

  // Function to handle click on the profile div
  const handleProfileClick = () => {
    navigate('/Profile');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white p-5 shadow-sm md:px-6 lg:ml-64">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-md p-2 text-slate-500 transition-colors duration-200 hover:bg-gray-200 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">
          {currentPageTitle}
        </h1>
      </div>
      <div className="flex flex-1 items-center justify-end md:gap-6">
        <div className="relative hidden w-full max-w-sm md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full border-2 border-gray-200 bg-gray-100 py-2 pl-10 pr-4 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 text-slate-500 transition-colors duration-200 hover:bg-gray-200">
            <Bell className="h-6 w-6" />
          </button>
          {/* Add a cursor-pointer class and onClick handler for the profile div */}
          <div 
            className="ml-2 flex cursor-pointer items-center gap-2"
            onClick={handleProfileClick} // Attach the click handler
          >
            <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-blue-600">
              <img
                src="https://placehold.co/100x100/3B82F6/FFFFFF?text=U"
                alt="User Profile"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/100x100/94A3B8/FFFFFF?text=U';
                }}
              />
            </div>
            <div className="hidden text-sm md:block">
              {/* Display the dynamic user name */}
              <p className="font-semibold text-gray-800">{userName}</p>
              <p className="text-gray-500">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;