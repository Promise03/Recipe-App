import {
  Users,
  ArrowUpRight,
  Package,
  ShoppingCart,
  Eye,
  CookingPot,
  Mail,
  UserPlus,
  ArrowRight,
} from 'lucide-react';
import Header from '../component/Reusables/header';
import Sidebar from '../component/Reusables/sidebar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { name: 'Total Users', value: '2,450', icon: Users, change: '+12.5%', trend: 'positive' },
    { name: 'New Orders', value: '1,024', icon: ShoppingCart, change: '-3.2%', trend: 'negative' },
    { name: 'Daily Visitors', value: '3,875', icon: Eye, change: '+5.8%', trend: 'positive' },
    { name: 'Total Products', value: '520', icon: Package, change: '+1.1%', trend: 'positive' },
  ];

  const quickAccessItems = [
    { name: 'Add User', icon: UserPlus, path: '/userForm', description: 'Create a new user account' },
    { name: 'Add Recipe', icon: CookingPot, path: '/blogs/new', description: 'Publish a new recipe post' },
    { name: 'View Messages', icon: Mail, path: '/ContactMessage', description: 'Respond to customer inquiries' },
  ];

  const recentActivity = [
    { type: 'New User', description: 'John Doe just signed up.', timestamp: '2 minutes ago', user: 'John Doe', icon: UserPlus, color: 'text-green-500' },
    { type: 'New Blog Post', description: 'Published a new article: "Top 10 Recipes".', timestamp: '1 hour ago', user: 'Admin', icon: CookingPot, color: 'text-blue-500' },
    { type: 'Contact Message', description: 'Received a message from Jane Smith.', timestamp: '3 hours ago', user: 'Jane Smith', icon: Mail, color: 'text-yellow-500' },
    { type: 'New Order', description: 'Order #12345 has been placed.', timestamp: '5 hours ago', user: 'System', icon: ShoppingCart, color: 'text-indigo-500' },
    { type: 'Product Update', description: 'Updated the price of "Organic Honey".', timestamp: '1 day ago', user: 'Admin', icon: Package, color: 'text-purple-500' },
  ];

  return (
    <div>
      <Header />
      <Sidebar />
      <main className="lg:ml-64 pt-20 px-4 pb-10">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          
          {/* Stats Section */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <h2 className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</h2>
                    <div className="flex items-center mt-2 text-sm ">
                      <span className={`flex items-center gap-1 ${stat.trend === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                        <ArrowUpRight size={16} />
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.trend === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Access and Recent Activity Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Quick Access Panel */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Quick Access</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickAccessItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-indigo-50 transition-colors duration-200 flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center text-gray-800">
                        <item.icon size={20} className="mr-2 text-indigo-600" />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 group-hover:text-indigo-700">{item.description}</p>
                    </div>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-indigo-600 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity Panel */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
              <ul className="mt-4 space-y-4">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`p-2 rounded-full mr-4 bg-gray-100 ${activity.color}`}>
                      <activity.icon size={20} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-800">
                        <span className="font-medium">{activity.type}:</span> {activity.description}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">{activity.timestamp}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;