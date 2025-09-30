import React, { useState } from 'react';
import {
  Mail,
} from 'lucide-react';
import Sidebar from '../component/Reuseable/SiderBar';
import Header from '../component/Reuseable/Header';


// The Messages Page component with a list of messages.
const Message = () => {
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

export default Message