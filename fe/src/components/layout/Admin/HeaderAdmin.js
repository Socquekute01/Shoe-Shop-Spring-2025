import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const HeaderAdmin = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="flex justify-end items-center p-4 border-b bg-white">
      <div className="relative">
        <button 
          className="flex items-center gap-2"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xs">JF</span>
          </div>
          <ChevronDown size={16} />
        </button>
        
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded z-10">
            <div className="p-4 border-b">
              <div className="font-medium">Jaydon Frankie</div>
              <div className="text-sm text-gray-500">demo@minimals.cc</div>
            </div>
            <div className="p-2">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 rounded">
                <span className="text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </span>
                Home
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 rounded">
                <span className="text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 rounded">
                <span className="text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </span>
                Settings
              </button>
            </div>
            <div className="p-2 border-t">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center rounded">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderAdmin;