import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  Settings,
  MessageSquare,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  DollarSign,
  Mail,
  Pencil,
  Trash2,
  Paperclip,
  Save,
  CheckCircle,
  BookText,
  CookingPot,
  ArrowLeft,
} from 'lucide-react';

// The Header component for the top of the dashboard.
const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white text-gray-800 shadow-sm rounded-b-xl">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-lg">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications Icon */}
        <button className="relative p-2 text-gray-500 hover:text-gray-800 transition-colors duration-200">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile Dropdown */}
        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200 hidden md:block">
            John Doe
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-800 transition-colors duration-200" />
        </div>
      </div>
    </header>
  );
};

// ---
// Page Components
// ---

// The Dashboard Page component with key metric cards and recent activity.
const DashboardPage = () => {
  const stats = [
    { name: 'Total Messages', value: '24', icon: <MessageSquare className="text-blue-500" /> },
    { name: 'Profile Views', value: '1,305', icon: <User className="text-green-500" /> },
    { name: 'Pending Tasks', value: '5', icon: <CheckCircle className="text-yellow-500" /> },
    { name: 'Revenue', value: '$1,500', icon: <DollarSign className="text-red-500" /> },
  ];

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4 transform transition-transform hover:scale-105">
            <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="h-64 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
          <p>No recent activity to show.</p>
        </div>
      </div>
    </div>
  );
};

// The Profile Page component with a form to edit user details.
const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software developer with a passion for web technologies.',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would be where you send data to an API
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900">User Profile</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
            JD
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
          <label className="block">
            <span className="text-gray-700 font-medium">Bio</span>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows="4"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition-colors ${!isEditing ? 'bg-gray-100 text-gray-600' : 'bg-white'}`}
            />
          </label>
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
  );
};

// The Messages Page component with a list of messages.
const MessagesPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Admin Team',
      subject: 'Welcome to your dashboard!',
      preview: 'Thank you for joining our platform. We are excited to have you here...',
      date: 'Just now',
      read: false,
    },
    {
      id: 2,
      sender: 'Support',
      subject: 'Your recent inquiry',
      preview: 'We have received your request and will get back to you within 24 hours...',
      date: '1 hour ago',
      read: true,
    },
    {
      id: 3,
      sender: 'Marketing',
      subject: 'Exclusive offer for you!',
      preview: 'As a valued member, we are offering you a special discount on...',
      date: 'Yesterday',
      read: true,
    },
  ]);

  const toggleReadStatus = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, read: !msg.read } : msg
      )
    );
  };

  return (
    <div className="space-y-8 p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900">Messages</h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <ul className="divide-y divide-gray-200">
          {messages.map((msg) => (
            <li key={msg.id} className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${!msg.read ? 'bg-blue-50' : ''}`} onClick={() => toggleReadStatus(msg.id)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Mail className={`h-5 w-5 ${!msg.read ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-gray-900 truncate ${!msg.read ? 'font-bold' : ''}`}>
                      {msg.sender}
                    </p>
                    <p className={`text-sm text-gray-600 truncate ${!msg.read ? 'text-gray-800' : ''}`}>
                      {msg.subject}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 min-w-max ml-4">{msg.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


// The Recipes Page component with a grid of recipe cards.
const RecipesPage = ({ onSelectRecipe }) => {
  const recipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      author: 'John Doe',
      image: 'https://placehold.co/400x200/cccccc/333333?text=Spaghetti+Carbonara',
      description: 'A classic Italian pasta dish from Rome made with eggs, hard cheese, cured pork, and black pepper.',
      ingredients: ['300g spaghetti', '150g guanciale or pancetta', '2 large eggs', '50g pecorino romano cheese', 'black pepper'],
      instructions: ['Cook spaghetti according to package directions.', 'While pasta cooks, crisp the guanciale.', 'Whisk eggs and cheese together.', 'Drain pasta and combine with guanciale.', 'Quickly mix in the egg and cheese mixture off the heat.'],
    },
    {
      id: 2,
      title: 'Classic Lasagna',
      author: 'Jane Smith',
      image: 'https://placehold.co/400x200/cccccc/333333?text=Classic+Lasagna',
      description: 'Layers of pasta, rich meat sauce, and creamy béchamel.',
      ingredients: ['Lasagna noodles', 'Ground beef', 'Tomato sauce', 'Ricotta cheese', 'Mozzarella cheese', 'Parmesan cheese'],
      instructions: ['Prepare meat sauce and béchamel.', 'Layer noodles, meat sauce, béchamel, and cheese.', 'Repeat layers and bake until bubbly and golden brown.'],
    },
    {
      id: 3,
      title: 'Chicken Tikka Masala',
      author: 'Chef Sona',
      image: 'https://placehold.co/400x200/cccccc/333333?text=Chicken+Tikka+Masala',
      description: 'A popular Indian dish of roasted chicken chunks in a spiced sauce.',
      ingredients: ['Chicken breast', 'Yogurt', 'Garlic', 'Ginger', 'Garam masala', 'Tomato puree', 'Cream'],
      instructions: ['Marinate chicken in spices and yogurt.', 'Roast chicken and set aside.', 'Sauté onions, garlic, and ginger.', 'Add spices, tomato puree, and cream.', 'Combine chicken with the sauce and simmer.'],
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900">Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition-transform hover:scale-105">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{recipe.title}</h3>
                <p className="mt-2 text-gray-600">{recipe.description}</p>
                <p className="mt-1 text-sm text-gray-500">by {recipe.author}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => onSelectRecipe(recipe)}
                  className="w-full flex items-center justify-center p-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <CookingPot className="h-5 w-5 mr-2" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// The Recipe Detail Page component to view a single recipe.
const RecipeDetailPage = ({ recipe, onBack }) => {
  if (!recipe) {
    return (
      <div className="space-y-8 p-8 flex items-center justify-center h-full">
        <p className="text-xl text-gray-500">No recipe selected.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8 max-w-5xl mx-auto">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Go Back
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl font-extrabold text-gray-900">{recipe.title}</h1>
            <p className="mt-2 text-lg text-gray-600">{recipe.description}</p>
            <p className="mt-1 text-sm text-gray-500">by {recipe.author}</p>
            
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ingredients</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img src={recipe.image} alt={recipe.title} className="w-full rounded-xl shadow-md" />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

// The Settings Page component with various user settings.
const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-8 p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900">Settings</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
        {/* Account Settings Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Account</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-sm text-gray-600">Update your account password for security.</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
              Change
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Delete Account</p>
              <p className="text-sm text-gray-600">Permanently delete your account and all data.</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-full hover:bg-red-50 transition-colors">
              Delete
            </button>
          </div>
        </div>
        
        {/* Notifications Settings Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive email alerts for important updates.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};


// The Sidebar component for navigation.
const Sidebar = ({ activePage, setActivePage }) => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, page: 'dashboard' },
    { name: 'Profile', icon: <User className="h-5 w-5" />, page: 'profile' },
    { name: 'Messages', icon: <MessageSquare className="h-5 w-5" />, page: 'messages' },
    { name: 'Recipes', icon: <CookingPot className="h-5 w-5" />, page: 'recipes' },
    { name: 'Settings', icon: <Settings className="h-5 w-5" />, page: 'settings' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-gray-200 shadow-lg flex flex-col justify-between rounded-r-xl">
      {/* Sidebar Content Top */}
      <div>
        {/* Logo/Title Section */}
        <div className="p-6 text-2xl font-bold text-white border-b border-gray-700">
          Dashboard
        </div>

        {/* Primary Navigation List */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePage(item.page)}
              className={`flex items-center w-full p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activePage === item.page
                  ? 'bg-blue-600 text-white shadow-inner'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Sidebar Content Bottom */}
      <div className="p-4 border-t border-gray-700">
        {/* Logout Link */}
        <button className="flex items-center w-full p-3 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-200">
          <LogOut className="h-5 w-5" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
};

// The main App component that ties everything together.
export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const renderPage = () => {
    // If a recipe is selected, show the detail page.
    if (selectedRecipe) {
      return <RecipeDetailPage recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
    }
    
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'messages':
        return <MessagesPage />;
      case 'recipes':
        return <RecipesPage onSelectRecipe={setSelectedRecipe} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen font-inter">
      {/* The Sidebar component with state management */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* The Header component */}
        <Header />

        {/* The main content area where the active page is rendered */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
