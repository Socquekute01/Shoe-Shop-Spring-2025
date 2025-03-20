// pages/UsersPage.jsx
import React, { useState } from 'react';
import { Search, MoreVertical, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Adam Trantow', company: 'Mohr, Langworth and Hills', role: 'UI Designer', verified: true, status: 'Active' },
    { id: 2, name: 'Angel Rolfson-Kulas', company: 'Koch and Sons', role: 'UI Designer', verified: true, status: 'Active' },
    { id: 3, name: 'Betty Hammes', company: 'Waeichi - VonRueden', role: 'UI Designer', verified: true, status: 'Active' },
    { id: 4, name: 'Billy Braun', company: 'White, Cassin and Goldner', role: 'UI Designer', verified: false, status: 'Banned' },
    { id: 5, name: 'Billy Stoltenberg', company: 'Medhurst, Moore and Franey', role: 'Leader', verified: true, status: 'Banned' },
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Users</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search user..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="px-4 py-3">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 flex items-center gap-1">
                  Name
                  <ArrowUp size={14} />
                </th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Verified</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs">{user.name.charAt(0)}</span>
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">{user.company}</td>
                  <td className="px-4 py-4">{user.role}</td>
                  <td className="px-4 py-4">
                    {user.verified ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select className="border rounded px-2 py-1 w-[60px]">
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">1-5 of 24</span>
            <div className="flex">
              <button className="p-1 border rounded-l">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1 border rounded-r border-l-0">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;