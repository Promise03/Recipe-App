import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  Home,
  Users,
  LayoutDashboard,
  LogOut,
  CookingPot,
  Mail,
  Bell,
  Search,
  Settings,
  ArrowUpRight,
  TrendingUp,
  Package,
  ShoppingCart,
  Calendar,
  Eye,
  Trash,
} from 'lucide-react';

// This is the main App component that renders the entire dashboard layout.
export default function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-gray-50 min-h-screen font-sans">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content Area */}
        {/* The margin is fixed to match the always-open sidebar. */}
        <div className="flex flex-col flex-1 lg:ml-64">
          {/* Header Component */}
          <Header />

          {/* Main content area where pages are rendered by the router */}
          <main className="p-4 sm:p-6 lg:p-8 flex-1">
            <div className="h-full">
              {/* React Router's Routes component to handle page rendering */}
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/recipes" element={<RecipePage />} />
                <Route path="/contact-messages" element={<ContactMessagesPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

// Sidebar component, responsible for the navigation menu.
const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Recipes', icon: CookingPot, path: '/recipes' },
    { name: 'Contact Messages', icon: Mail, path: '/contact-messages' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-50 bg-white shadow-lg border-r border-gray-200 w-64 p-4 flex flex-col justify-between`}
    >
      <div>
        {/* Logo and Dashboard Title */}
        <div className="flex items-center space-x-2 mb-8 justify-start">
          <div className="p-2 bg-indigo-600 rounded-full">
            <Home size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-800">
            Admin
          </span>
        </div>

        {/* Navigation Links using React Router's Link component */}
        <nav>
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center p-3 text-gray-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 group"
                >
                  <item.icon size={20} className="transition-all duration-200 group-hover:scale-110" />
                  <span className="ml-3 font-medium transition-opacity duration-300">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout button using React Router's Link component */}
      <div className="pt-4 border-t border-gray-200">
        <Link
          to="/logout"
          className={`flex items-center p-3 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 group justify-start`}
        >
          <LogOut size={20} className="transition-all duration-200 group-hover:scale-110" />
          <span className="ml-3 font-medium transition-opacity duration-300">
            Logout
          </span>
        </Link>
      </div>
    </aside>
  );
};

// Header component, responsible for the top bar.
const Header = () => {
  return (
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
  );
};

// --- Page Components ---

// Dashboard Page: Displays key metrics and a welcome message.
const DashboardPage = () => {
  const stats = [
    { name: 'Total Users', value: '2,450', icon: Users, change: '+12.5%', trend: 'positive' },
    { name: 'New Orders', value: '1,024', icon: ShoppingCart, change: '-3.2%', trend: 'negative' },
    { name: 'Daily Visitors', value: '3,875', icon: Eye, change: '+5.8%', trend: 'positive' },
    { name: 'Total Products', value: '520', icon: Package, change: '+1.1%', trend: 'positive' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <h2 className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</h2>
              <div className="flex items-center mt-2 text-sm">
                <span className={`flex items-center gap-1 ${stat.trend === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  <ArrowUpRight size={16} />
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-2">since last month</span>
              </div>
            </div>
            <div className={`p-3 rounded-full ${stat.trend === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
        <p className="mt-2 text-gray-600">This area can be used for charts, recent orders, or other relevant information.</p>
      </div>
    </div>
  );
};

// Users Page: Displays a list of users in a responsive table.
const UsersPage = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor' },
    { id: 3, name: 'Peter Jones', email: 'peter.j@example.com', role: 'Viewer' },
    { id: 4, name: 'Maria Garcia', email: 'maria.g@example.com', role: 'Editor' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Users</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mx-2">Edit</button>
                  <button className="text-red-600 hover:text-red-900 mx-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Recipe Page: Displays a gallery of recipe cards.
const RecipePage = () => {
  const recipes = [
    { id: 1, title: 'Chicken Stir-fry', description: 'Quick and easy weeknight dinner.', image: 'https://placehold.co/400x200/F0F4F8/64748B?text=Recipe+1' },
    { id: 2, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.', image: 'https://placehold.co/400x200/E2E8F0/475569?text=Recipe+2' },
    { id: 3, title: 'Vegetable Soup', description: 'Healthy and comforting.', image: 'https://placehold.co/400x200/CBD5E1/4B5563?text=Recipe+3' },
    { id: 4, title: 'Chocolate Cake', description: 'Rich and decadent dessert.', image: 'https://placehold.co/400x200/94A3B8/334155?text=Recipe+4' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">{recipe.description}</p>
              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Messages Page: Displays a list of messages.
const ContactMessagesPage = () => {
  const messages = [
    { id: 1, name: 'Alex Johnson', subject: 'Question about an order', date: '2023-10-27', snippet: 'Hi, I have a question about my recent order...' },
    { id: 2, name: 'Samantha Lee', subject: 'Feedback on the website', date: '2023-10-26', snippet: 'Just wanted to say I love the new design...' },
    { id: 3, name: 'Michael Chen', subject: 'Technical issue with login', date: '2023-10-25', snippet: 'I am unable to log into my account. I keep getting an error...' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Contact Messages</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200 overflow-hidden">
        {messages.map((message) => (
          <div key={message.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <p className="text-sm font-semibold text-gray-900">{message.name}</p>
                <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">{message.date}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-gray-800 truncate">{message.subject}</p>
              <p className="mt-1 text-sm text-gray-500 truncate">{message.snippet}</p>
            </div>
            <div className="flex-shrink-0 flex items-center space-x-2 ml-4">
              <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-md">
                <Eye size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-600 rounded-md">
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Placeholder page components for demonstration
const LogoutPage = () => <h1 className="text-3xl font-bold">Logging out...</h1>;
const NotFoundPage = () => <h1 className="text-3xl font-bold">404 - Page Not Found</h1>;


// import Header from "../component/Reusables/header";
// import Sidebar from "../component/Reusables/sidebar";
// import { useState, useEffect} from "react";
// import { Plus, Pencil, Trash2, BookOpen } from "lucide-react"; // Import BookOpen icon
// import RecipeForm from "../component/RecipeForm";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import RecipeDetail from "./RecipeDetails";// Import the RecipeDetail component

// const Recipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const token = useSelector((state) => state.auth)
//   const navigate = useNavigate();

//   const fetchRecipe = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/recipe/all-recipes",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           }
//         }
//       )
//       setRecipes(res.data.recipe)
//     }catch (e) {
// console.log(e.message)
//     }
//   }

//   useEffect(() =>{
//     fetchRecipe()
//   }, [fetchRecipe])

//   //  {
//   //     id: 1,
//   //     title: 'Spaghetti Carbonara',
//   //     author: 'Chef Gordon',
//   //     image: 'https://placehold.co/400x200/cccccc/333333?text=Spaghetti',
//   //     description: 'A classic Italian pasta dish from Rome made with eggs, hard cheese, cured pork, and black pepper. Simple yet incredibly flavorful.',
//   //     ingredients: ['300g spaghetti', '150g guanciale or pancetta', '2 large eggs', '50g Pecorino Romano cheese', 'Freshly ground black pepper'],
//   //     instructions: [
//   //       'Cook spaghetti according to package directions until al dente.',
//   //       'While pasta cooks, cut guanciale into small strips and cook in a large pan over medium heat until crispy. Remove guanciale and set aside, leaving the rendered fat in the pan.',
//   //       'In a bowl, whisk eggs and grated Pecorino Romano cheese together until smooth. Season generously with black pepper.',
//   //       'Drain the spaghetti, reserving about 1/2 cup of pasta water. Add the hot spaghetti to the pan with the guanciale fat. Toss to coat.',
//   //       'Immediately pour the egg and cheese mixture over the pasta, stirring vigorously to emulsify. Add a splash of reserved pasta water if needed to create a creamy sauce. Do not put back on heat.',
//   //       'Stir in the crispy guanciale. Serve immediately with extra Pecorino Romano and black pepper.'
//   //     ],
//   //   },
//   //   {
//   //     id: 2,
//   //     title: 'Classic Lasagna',
//   //     author: 'Chef Jamie',
//   //     image: 'https://placehold.co/400x200/cccccc/333333?text=Lasagna',
//   //     description: 'Layers of tender pasta, rich meat sauce, creamy béchamel, and melted cheese, baked to golden perfection.',
//   //     ingredients: ['Lasagna noodles', 'Ground beef', 'Crushed tomatoes', 'Onion', 'Garlic', 'Ricotta cheese', 'Mozzarella cheese', 'Parmesan cheese', 'Milk', 'Butter', 'Flour', 'Nutmeg', 'Salt', 'Pepper'],
//   //     instructions: [
//   //       'Prepare the meat sauce: Brown ground beef with diced onion and garlic. Add crushed tomatoes and simmer for at least 30 minutes.',
//   //       'Prepare the béchamel sauce: Melt butter, whisk in flour, then gradually add milk, stirring until thickened. Season with salt, pepper, and nutmeg.',
//   //       'Cook lasagna noodles according to package directions until al dente.',
//   //       'Assemble the lasagna: Spread a thin layer of meat sauce at the bottom of a baking dish. Layer with noodles, ricotta cheese, mozzarella, meat sauce, and béchamel. Repeat layers.',
//   //       'Finish with a layer of noodles topped with béchamel, mozzarella, and Parmesan.',
//   //       'Bake in a preheated oven at 375°F (190°C) for 30-40 minutes, or until bubbly and golden brown. Let rest for 10-15 minutes before serving.'
//   //     ],
//   //   },
//   //   {
//   //     id: 3,
//   //     title: 'Chicken Tikka Masala',
//   //     author: 'Chef Sona',
//   //     image: 'https://placehold.co/400x200/cccccc/333333?text=Tikka+Masala',
//   //     description: 'A popular Indian dish featuring roasted chicken pieces in a rich, creamy, and spiced tomato sauce.',
//   //     ingredients: ['Chicken breast', 'Plain yogurt', 'Ginger-garlic paste', 'Turmeric powder', 'Cumin powder', 'Coriander powder', 'Garam masala', 'Red chili powder', 'Onion', 'Tomato puree', 'Heavy cream', 'Kasuri Methi (dried fenugreek leaves)'],
//   //     instructions: [
//   //       'Marinate chicken: Cut chicken into chunks. Mix with yogurt, ginger-garlic paste, turmeric, cumin, coriander, red chili powder, and salt. Marinate for at least 30 minutes, or overnight.',
//   //       'Cook chicken: Skewer chicken pieces and grill, bake, or pan-fry until lightly charred and cooked through. Set aside.',
//   //       'Prepare sauce: In a large pan, sauté chopped onions until golden. Add ginger-garlic paste and cook for a minute. Stir in remaining spices (turmeric, cumin, coriander, garam masala, chili powder).',
//   //       'Add tomato puree and cook until the oil separates. Stir in heavy cream and a little water to reach desired consistency. Bring to a simmer.',
//   //       'Add the cooked chicken to the sauce. Stir in kasuri methi. Simmer for 10-15 minutes, allowing flavors to meld.',
//   //       'Serve hot with basmati rice or naan bread.'
//   //     ],
//   //   },
//   //   {
//   //     id: 4,
//   //     title: 'Vegetable Stir Fry',
//   //     author: 'Chef Kenji',
//   //     image: 'https://placehold.co/400x200/cccccc/333333?text=Stir+Fry',
//   //     description: 'A quick and healthy meal packed with fresh vegetables and a savory sauce, perfect for a weeknight dinner.',
//   //     ingredients: ['Broccoli florets', 'Carrots (sliced)', 'Bell peppers (sliced)', 'Snap peas', 'Mushrooms (sliced)', 'Soy sauce', 'Sesame oil', 'Rice vinegar', 'Cornstarch', 'Garlic (minced)', 'Ginger (grated)', 'Vegetable broth'],
//   //     instructions: [
//   //       'Prepare stir-fry sauce: In a small bowl, whisk together soy sauce, sesame oil, rice vinegar, cornstarch, and vegetable broth. Set aside.',
//   //       'Heat a large wok or skillet over high heat. Add a little oil. Add garlic and ginger and stir-fry for 30 seconds until fragrant.',
//   //       'Add harder vegetables like broccoli and carrots. Stir-fry for 3-4 minutes until slightly tender-crisp.',
//   //       'Add softer vegetables like bell peppers, snap peas, and mushrooms. Continue to stir-fry for another 2-3 minutes.',
//   //       'Give the stir-fry sauce a quick whisk (as cornstarch settles) and pour it over the vegetables. Cook, stirring constantly, until the sauce thickens and coats the vegetables, about 1-2 minutes.',
//   //       'Serve immediately over rice or noodles.'
//   //     ],
//   //   },

//   // const [editingRecipe, setEditingRecipe] = useState(null);
//   // const [selectedRecipe, setSelectedRecipe] = useState(null); // New state for viewing a single recipe

//   // const handleAddRecipe = (newRecipe) => {
//   //   setRecipes((prevRecipes) => [
//   //     ...prevRecipes,
//   //     { ...newRecipe, id: prevRecipes.length ? Math.max(...prevRecipes.map(r => r.id)) + 1 : 1 },
//   //   ]);
//   //   setEditingRecipe(null);
//   // };

//   // const handleUpdateRecipe = (updatedRecipe) => {
//   //   setRecipes((prevRecipes) =>
//   //     prevRecipes.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
//   //   );
//   //   setEditingRecipe(null);
//   // };

//   // const handleDeleteRecipe = (id) => {
//   //   setRecipes((prevRecipes) => prevRecipes.filter((r) => r.id !== id));
//   //   // If the deleted recipe was the one being viewed, clear selectedRecipe
//   //   if (selectedRecipe && selectedRecipe.id === id) {
//   //     setSelectedRecipe(null);
//   //   }
//   // };

//   // const handleViewRecipe = (recipe) => {
//   //   setSelectedRecipe(recipe);
//   //   setEditingRecipe(null); // Ensure no form is open when viewing a recipe
//   // };

//   // const handleBackToRecipes = () => {
//   //   setSelectedRecipe(null);
//   // };

//   return (
//     <div>
//       <Header />
//       <Sidebar />
//       <div className="space-y-6 lg:ml-64 pt-20 px-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-900">Recipes</h1>
//           <button
//             className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Add Recipe
//           </button>
//         </div>

//         {/* Conditional rendering for RecipeForm or RecipeDetail or Recipe List */}
//         {/* {editingRecipe ? (
//           <RecipeForm
//             recipe={editingRecipe}
//             onSave={editingRecipe.id ? handleUpdateRecipe : handleAddRecipe}
//             onCancel={() => setEditingRecipe(null)}
//           />
//         ) : selectedRecipe ? (
//           <RecipeDetail recipe={selectedRecipe} onBack={handleBackToRecipes} />
//         ) : ( */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {recipes.map((recipe) => (
//               <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
//                 <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
//                 <div className="p-4 flex-1 flex flex-col justify-between">
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900">{recipe.title}</h3>
//                     <p className="mt-1 text-sm text-gray-500">by {recipe.author}</p>
//                   </div>
//                   <div className="mt-4 flex space-x-2">
//                     <button
//                       onClick={() => handleViewRecipe(recipe)} // New "View Recipe" button
//                       className="flex-1 flex items-center justify-center p-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
//                     >
//                       <BookOpen className="h-4 w-4 mr-2" />
//                       View
//                     </button>
//                     <button
//                       onClick={() => {
//                         setEditingRecipe(recipe);
//                         setSelectedRecipe(null); // Close detail view if editing
//                       }}
//                       className="flex-1 flex items-center justify-center p-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
//                     >
//                       <Pencil className="h-4 w-4 mr-2" />
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteRecipe(recipe.id)}
//                       className="flex-1 flex items-center justify-center p-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
//                     >
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
        
//       </div>
//     </div>
//   );
// };

// export default Recipes;


// import React, { useState } from 'react';

// // Component for adding and editing recipes
// const RecipeForm = ({ recipe, onSave, onCancel }) => {
//   // // Initialize formData with existing recipe data or default empty values
//   // const [formData, setFormData] = useState(
//   //   recipe || {
//   //     id: null,
//   //     title: '',

//   //     description: '', // Added description field
//   //     ingredients: '',
//   //     instructions: '',
//   //     image: '',
//   //     videoUrl: '',
//   //   }
//   // );

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData((prevData) => ({ ...prevData, [name]: value }));
//   // };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   onSave(formData);
//   // };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-gray-900">{recipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>
//       <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//             required
//           />
//         </div>
//         {/* <div>
//           <label htmlFor="author" className="block text-sm font-medium text-gray-700">
//             Author
//           </label>
//           <input
//             type="text"
//             id="author"
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//             required
//           />
//         </div> */}
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows="3" // Adjust rows as needed
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//             required
//           ></textarea>
//         </div>
//         <div>
//           <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
//             Ingredients (comma-separated or one per line)
//           </label>
//           <textarea
//             id="ingredients"
//             name="ingredients"
//             value={formData.ingredients}
//             onChange={handleChange}
//             rows="5" // Adjust rows as needed
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//             required
//           ></textarea>
//         </div>
//         <div>
//           <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
//             Instructions
//           </label>
//           <textarea
//             id="instructions"
//             name="instructions"
//             value={formData.instructions}
//             onChange={handleChange}
//             rows="7" // Adjust rows as needed
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//             required
//           ></textarea>
//         </div>
//         <div>
//           <label htmlFor="image" className="block text-sm font-medium text-gray-700">
//             Image URL
//           </label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
//             Video URL (Optional)
//           </label>
//           <input
//             type="text"
//             id="videoUrl"
//             name="videoUrl"
//             value={formData.videoUrl}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
//             // The schema says 'require: true' but video URLs are often optional in UIs,
//             // so I've made it not required here for user flexibility.
//             // If it must be required, add `required` prop.
//           />
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RecipeForm;