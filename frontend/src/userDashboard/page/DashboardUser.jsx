import {
  User,
  MessageSquare,
  DollarSign,
  CheckCircle,
} from 'lucide-react';
import Sidebar from '../component/Reuseable/SiderBar';
import Header from '../component/Reuseable/Header';

// The Dashboard Page component with key metric cards and recent activity.
const DashboardUser = () => {
  const stats = [
    { name: 'Total Messages', value: '24', icon: <MessageSquare className="text-blue-500" /> },
    { name: 'Total Recipe', value: '1,305', icon: <User className="text-green-500" /> },
    // { name: 'Pending Tasks', value: '5', icon: <CheckCircle className="text-yellow-500" /> },
    // { name: 'Revenue', value: '$1,500', icon: <DollarSign className="text-red-500" /> },
  ];

  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="space-y-8 px-8 lg:ml-64 pt-10 ">
      <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
    </>
  );
};

export default DashboardUser