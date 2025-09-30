import { useState, useEffect, useRef } from 'react'; // Import useRef
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import { logout } from '../../../redux/slices/authSlices';
import {
  Home,
  Users,
  LayoutDashboard,
  LogOut,
  CookingPot,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const sidebarRef = useRef(null); // Initialize useRef

  // Function to toggle the sidebar's open/closed state.
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to close the sidebar specifically for smaller screens.
  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // useEffect to handle window resize and clicks outside the sidebar.
  useEffect(() => {
    // Handler for window resize events
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Handler for clicks outside the sidebar on small screens
    const handleClickOutside = (event) => {
      // Check if the click is outside the sidebar
      if (
        isSidebarOpen &&
        window.innerWidth < 1024 &&
        sidebarRef.current && // Make sure sidebarRef.current exists
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]); // Re-run effect if isSidebarOpen changes

  

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/Dashboard' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Recipes', icon: CookingPot, path: '/recipes' },
    { name: 'Contact Messages', icon: Mail, path: '/ContactMessage' },
  ];
  const dispatch = useDispatch()

  return (
    <aside
      ref={sidebarRef} 
      className={`fixed top-0 left-0 bottom-0 z-50 bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out
      ${isSidebarOpen ? 'w-64' : 'w-20'} p-4 flex flex-col justify-between`}
    >
      <div>
      
        <div className={`flex items-center space-x-2 mb-8 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
          <div className="p-2 bg-indigo-600 rounded-full">
            <Home size={24} className="text-white" />
          </div>
          {isSidebarOpen && (
            <span className="text-2xl font-bold text-gray-800 transition-opacity duration-300">
              Admin
            </span>
          )}
        </div>

        {/* Navigation Links using React Router's NavLink component */}
        <nav>
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => // Use a function to apply active styles
                    `flex items-center p-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 group
                    ${isActive ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-600'}` // Apply active styles
                  }
                  onClick={closeSidebarOnMobile}
                  end={item.path === '/Dashboard'} // Use `end` for exact match for the Dashboard path
                >
                  <item.icon size={20} className="transition-all duration-200 group-hover:scale-110" />
                  {isSidebarOpen && (
                    <span className="ml-3 font-medium transition-opacity duration-300">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout button and sidebar toggle */}
      <div className="pt-4 border-t border-gray-200">
        <NavLink 
          to="/logout"
          className={({ isActive }) => // Optional: Apply active style to logout if it's a route
            `flex items-center p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 group
            ${isSidebarOpen ? 'justify-start' : 'justify-center'}
            ${isActive ? 'bg-red-100 text-red-700 font-semibold' : 'text-gray-600'}`
          }
          onClick={closeSidebarOnMobile}
        >
          <LogOut size={20} className="transition-all duration-200 group-hover:scale-110" />
          {isSidebarOpen && (
            <span className="ml-3 font-medium transition-opacity duration-300"
            onClick={() => dispatch(logout())}>
              Logout
            </span>
          )}
        </NavLink>
        <div className={`flex ${isSidebarOpen ? 'justify-end' : 'justify-center'} mt-4`}>
          <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;