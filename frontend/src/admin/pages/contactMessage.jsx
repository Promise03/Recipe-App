import {
  Eye,
  Trash,
} from 'lucide-react';
import Header from '../component/Reusables/header';
import Sidebar from '../component/Reusables/sidebar';


// Contact Messages Page: Displays a list of messages.
const ContactMessages = () => {
  const messages = [
    { id: 1, name: 'Alex Johnson', subject: 'Question about an order', date: '2023-10-27', snippet: 'Hi, I have a question about my recent order...' },
    { id: 2, name: 'Samantha Lee', subject: 'Feedback on the website', date: '2023-10-26', snippet: 'Just wanted to say I love the new design...' },
    { id: 3, name: 'Michael Chen', subject: 'Technical issue with login', date: '2023-10-25', snippet: 'I am unable to log into my account. I keep getting an error...' },
  ];

  return (
 <div>
    <Header/>
    <Sidebar/>
       <div className="space-y-6 lg:ml-64 pt-20 px-4">
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
 </div>
  );
};

export default ContactMessages