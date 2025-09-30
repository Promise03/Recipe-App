// import { useState } from 'react'
import {
  Bell,
  Search,
  Settings,
} from 'lucide-react';

// Header component, responsible for the top bar.
const Header = () => {
  return (
   <>
   <div>
     <header className="fixed top-0 z-40 p-4 right-0 left-64 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full max-w-sm mr-4">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
          />
        </div>

        {/* User Profile and Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200">
            <Settings size={20} />
          </button>
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer shadow-sm">
            JD
          </div>
        </div>
      </div>
    </header>
   </div>
   </>
  );
};

export default Header